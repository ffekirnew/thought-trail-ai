import UserEntity from "../../../domain/entities/user.entity";
import LoggedInUserDto from "./dtos/logged-in-user.dto";
import {
  IEmailSender,
  IJwtGenerator,
  IOneTimeCodeGenerator,
  IPasswordHasher,
} from "../../contracts/infrastructure";
import { RegisterUserDto, LoginUserDto, VerifyEmailDto } from "./dtos";
import { BaseResponse } from "../../responses";
import UserDto from "./dtos/user.dto";
import { IAuthRepository } from "../../contracts/persistence";

class AuthApplication {
  constructor(
    private readonly jwtGenerator: IJwtGenerator,
    private readonly passwordHasher: IPasswordHasher,
    private readonly authRepository: IAuthRepository,
    private readonly emailSender: IEmailSender,
    private readonly oneTimeCodeGenerator: IOneTimeCodeGenerator,
  ) {}

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<BaseResponse<LoggedInUserDto>> {
    try {
      loginUserDto.validate();
    } catch (error) {
      return BaseResponse.error<LoggedInUserDto>(
        "Login failed.",
        error.message,
      );
    }

    const user = await this.authRepository.getByUsername(loginUserDto.username);
    if (!user)
      return BaseResponse.error<LoggedInUserDto>(
        "Login failed.",
        "Username doesn't exist",
      );

    const passwordVerified = await this.passwordHasher.validate(
      loginUserDto.password,
      user.password,
    );
    if (!passwordVerified)
      return BaseResponse.error<LoggedInUserDto>(
        "Login failed.",
        "Password is incorrect",
      );

    const token = this.jwtGenerator.generate(user);
    const userDto = UserDto.fromEntity(user);
    const loggedInUser: LoggedInUserDto = { user: userDto, token: token };

    return BaseResponse.success<LoggedInUserDto>(
      "Login was successful.",
      loggedInUser,
    );
  }

  async registerSkipVerification(
    createUserDto: RegisterUserDto,
  ): Promise<BaseResponse<LoggedInUserDto>> {
    try {
      createUserDto.validate();
    } catch (error) {
      return BaseResponse.error<LoggedInUserDto>(
        "User registration failed.",
        error.message,
      );
    }

    const userExists =
      (await this.authRepository.getByEmail(createUserDto.email)) ||
      (await this.authRepository.getByUsername(createUserDto.username));

    if (userExists)
      return BaseResponse.error<LoggedInUserDto>(
        "User registration failed.",
        "User name exists.",
      );

    const user = new UserEntity({
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      salt: await this.passwordHasher.generateSalt(),
    });
    user.password = await this.passwordHasher.hash(
      createUserDto.password,
      user.salt,
    );
    user.verificationToken = this.oneTimeCodeGenerator.generate();
    user._id = await this.authRepository.create(user);

    const loginUserDto = new LoginUserDto(
      user.username,
      createUserDto.password,
    );
    return this.login(loginUserDto);
  }

  async register(
    createUserDto: RegisterUserDto,
  ): Promise<BaseResponse<string>> {
    try {
      createUserDto.validate();
    } catch (error) {
      return BaseResponse.error<string>(
        "User registration failed.",
        error.message,
      );
    }

    const userExists =
      (await this.authRepository.getByEmail(createUserDto.email)) ||
      (await this.authRepository.getByUsername(createUserDto.username));

    if (userExists)
      return BaseResponse.error<string>(
        "User registration failed.",
        "User name exists.",
      );

    const user = new UserEntity({
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      salt: await this.passwordHasher.generateSalt(),
    });
    user.password = await this.passwordHasher.hash(
      createUserDto.password,
      user.salt,
    );
    user.verificationToken = this.oneTimeCodeGenerator.generate();
    user._id = await this.authRepository.create(user);
    const emailSent = await this.sendVerificationEmail(user);

    if (emailSent) {
      return BaseResponse.success<string>(
        "User registration was successful.",
        `User was registered successfully. Verification code has been sent to your email at ${user.email}.`,
      );
    }
    return BaseResponse.error<string>(
      "User registration failed.",
      "Email was not sent.",
    );
  }

  async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<BaseResponse<string>> {
    try {
      verifyEmailDto.validate();
    } catch (error) {
      return BaseResponse.error<string>(
        "Email verification failed.",
        error.message,
      );
    }
    const user = await this.authRepository.getByEmail(verifyEmailDto.email);
    if (!user)
      return BaseResponse.error<string>(
        "Email verification failed.",
        "User not found.",
      );

    if (user.verificationToken !== verifyEmailDto.code)
      return BaseResponse.error<string>(
        "Email verification failed.",
        "Code is invalid.",
      );

    user.emailVerified = true;
    await this.authRepository.update(user);

    return BaseResponse.success<string>(
      "Email verification was successful.",
      "Email verified.",
    );
  }

  private async sendVerificationEmail(user: UserEntity): Promise<boolean> {
    const emailBody = `Verify your email by using this one-time code: ${user.verificationToken}.`;
    return this.emailSender.send(
      user.email,
      "ThoughtTrail: Verify your email",
      emailBody,
    );
  }
}

export default AuthApplication;

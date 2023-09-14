import { Response, Request } from "express";
import AuthApplication from "../../application/features/auth/auth.application";
import JwtGenerator from "../../infrastructure/jwt/jwt-generator";
import PasswordHasher from "../../infrastructure/password/password-hasher";
import OneTimeCodeGenerator from "../../infrastructure/one-time-code/one-time-code-generator";
import EmailSender from "../../infrastructure/email/email-sender";
import config from "../core/app.config";
import { AuthRepository } from "../../persistence/repositories";
import { Post, Route } from "tsoa";
import { LoginUserDto, RegisterUserDto, VerifyEmailDto } from "../../application/features/auth/dtos";

@Route('auth')
class AuthController {
  authApp: AuthApplication;
  constructor() {
    const jwtGenerator = new JwtGenerator(config.jwt.secret, config.jwt.expiresIn);
    const passwordHasher = new PasswordHasher(config.password.salt);
    const oneTimeCodeGenerator = new OneTimeCodeGenerator();
    const emailSender = new EmailSender(config.email.user, config.email.pass, config.email.service, config.email.host);
    const authRepository = new AuthRepository();

    this.authApp = new AuthApplication(jwtGenerator, passwordHasher, authRepository, emailSender, oneTimeCodeGenerator);
  }

  @Post('login')
  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const loginDto = new LoginUserDto(username, password);

    const response = await this.authApp.login(loginDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }

  @Post('register')
  register = async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body;

    const registerDto = new RegisterUserDto(name, username, email, password);
    const response = await this.authApp.register(registerDto);

    if (response.success) res.status(201).json(response);
    else res.status(400).json(response);
  }

  @Post('register')
  registerNoVerification = async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body;

    const registerDto = new RegisterUserDto(name, username, email, password);
    const response = await this.authApp.registerSkipVerification(registerDto);

    if (response.success) res.status(201).json(response);
    else res.status(400).json(response);
  }

  @Post('verify-email')
  verifyEmail = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    const verifyEmailDto = new VerifyEmailDto(email, code);
    const response = await this.authApp.verifyEmail(verifyEmailDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }
}

export default AuthController;


import { Response, Request } from "express";
import AuthApplication from "../../application/features/auth/auth.application";
import JwtGenerator from "../../infrastructure/jwt/jwt-generator";
import PasswordHasher from "../../infrastructure/password/password-hasher";
import OneTimeCodeGenerator from "../../infrastructure/one-time-code/one-time-code-generator";
import EmailSender from "../../infrastructure/email/email-sender";
import UserRepository from "../../persistence/repositories/user.repository";
import config from "../core/app.config";
import LoginUserDto from "../../application/features/auth/dtos/login-user.dto";
import CreateUserDto from "../../application/features/auth/dtos/create-user.dto";
import VerifyEmailDto from "../../application/features/auth/dtos/verify-email.dto";


class AuthController {
  authApp: AuthApplication;
  constructor() {
    const jwtGenerator = new JwtGenerator(config.jwt.secret, config.jwt.expiresIn);
    const passwordHasher = new PasswordHasher(config.password.salt);
    const oneTimeCodeGenerator = new OneTimeCodeGenerator();
    const emailSender = new EmailSender(config.email.user, config.email.pass, config.email.service, config.email.host);
    const userRepository = new UserRepository();

    this.authApp = new AuthApplication(jwtGenerator, passwordHasher, userRepository, emailSender, oneTimeCodeGenerator);
  }


  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const loginDto = new LoginUserDto(username, password);

    const response = await this.authApp.login(loginDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }

  register = async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body;

    const registerDto = new CreateUserDto(name, username, email, password);
    const response = await this.authApp.register(registerDto);

    if (response.success) res.status(201).json(response);
    else res.status(400).json(response);
  }

  verifyEmail = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    const verifyEmailDto = new VerifyEmailDto(email, code);
    const response = await this.authApp.verifyEmail(verifyEmailDto);

    if (response.success) res.status(200).json(response);
    else res.status(400).json(response);
  }
}

export default AuthController;


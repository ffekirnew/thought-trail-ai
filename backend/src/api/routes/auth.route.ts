import { Router } from "express";

import AuthController from "../controllers/auth.controller";
const authController = new AuthController();

const AuthRouter = Router();

AuthRouter.post('/login', authController.login);
AuthRouter.post('/register', authController.register);
AuthRouter.post('/verify-email', authController.verifyEmail);

export default AuthRouter;

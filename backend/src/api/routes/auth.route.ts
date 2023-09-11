import { Router } from "express";

import AuthController from "../controllers/auth.controller";
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */
const AuthRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '400':
 *         description: Invalid login credentials
 */
AuthRouter.post('/login', authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Registration failed
 */
AuthRouter.post('/register', authController.register);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '400':
 *         description: Email verification failed
 */
AuthRouter.post('/verify-email', authController.verifyEmail);

export default AuthRouter;

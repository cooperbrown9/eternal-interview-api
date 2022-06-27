import * as AuthMiddleware from "../middleware/auth/index.js"

import express from "express";

const AuthRouter = express.Router();

AuthRouter.route('/').get(AuthMiddleware.authenticateAndGetUser)
AuthRouter.route('/login').post(AuthMiddleware.login)

export { AuthRouter }

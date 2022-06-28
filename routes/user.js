import express from "express";
import { UserController, FollowController } from "../controllers/index.js";
import * as AuthMiddleware from "../middleware/auth/index.js";

const UserRouter = express.Router();

UserRouter.route("/").post(UserController.create);
UserRouter.route("/").get(UserController.find);

UserRouter.route("/:userId").get(AuthMiddleware.verifySession, UserController.get);
UserRouter.route("/:userId").post(AuthMiddleware.verifySession, UserController.update);

UserRouter.route("/:userId/follow").get(AuthMiddleware.verifySession, FollowController.list);
UserRouter.route("/:userId/follow").post(AuthMiddleware.verifySession, FollowController.follow);

UserRouter.route("/:userId/unfollow").post(AuthMiddleware.verifySession, FollowController.unfollow);

UserRouter.route("/:userId/follow/:followingId").get(AuthMiddleware.verifySession, FollowController.isFollowing);

export { UserRouter }

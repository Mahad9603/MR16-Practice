import { Router } from "express";
import userController from "../../controller/user/index.js";
import autherizationMiddleware from "../../middleware/auth.js";

const userRouter = Router();

userRouter.post('/auth/signup', userController.signUp);
userRouter.post('/auth/signin', autherizationMiddleware, userController.signIn)

export default userRouter;
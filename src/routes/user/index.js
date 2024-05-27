import { Router } from "express";
import userController from "../../controller/user/index.js";

const userRouter = Router();

userRouter.post('/auth/signup', userController.signUp);
userRouter.post('/auth/signin', userController.signIn)

export default userRouter;
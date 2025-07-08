import express from "express";
const authRouter = express.Router();
import { signIn, signUp,updateProfile,getProfileData } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

authRouter.post('/signin',signIn);
authRouter.post('/signup',signUp);
authRouter.patch('/updateprofile',verifyToken,updateProfile);
authRouter.get('/getprofiledata',verifyToken,getProfileData);

export default authRouter;
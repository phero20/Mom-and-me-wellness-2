import express from "express";
const userRouter = express.Router();
import verifyToken from "../middlewares/verifyToken.js";
import { reportUpload, getReports } from '../controllers/userController.js';
import upload from '../config/multer.js';

userRouter.post('/report-upload', verifyToken, upload.single('file'), reportUpload);
userRouter.get('/get-reports', verifyToken, getReports);


export default userRouter;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodbConfig.js";
import authRouter from "./routes/authRoute.js";
import userRouter from './routes/userRoutes.js';
import './config/cloudinary.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors()); // Allow all origins
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', authRouter);
app.use('/user',userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



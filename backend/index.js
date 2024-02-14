
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDataBase from "./config/database.js";
import { userRouter } from "./routes/userRoutes.js"
import { appRouter } from "./routes/appRoutes.js";

dotenv.config();
// Calling function from folder [config] to establish connection with DB.
connectDataBase();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
// Guiding Node to use following routes to complete CRUD process.
app.use('/user', userRouter);
app.use('/user', appRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))
import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); 
import dbConnection from './config/DataBase.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './Route/UserRoutes.js'
import actionRoutes from './Route/ActionRoute.js';
const app = express();
 
dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/action', actionRoutes);


export default app;
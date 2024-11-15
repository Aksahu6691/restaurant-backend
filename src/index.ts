import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import { dishRoutes, testimonialRoutes, userRoutes } from './api';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // enable static folder

// Mount all routes
app.use('/api/dish', dishRoutes);
app.use('/api/testimonial', testimonialRoutes);
app.use('/api/user', userRoutes);

// If not found api then give message
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(`Can't find ${req.originalUrl} on the server`);
});

// Error Handle
process.on("uncaughtException", (err) => {
    console.error(err.name, err.message);
    console.error("Uncaught Exception occurred! Shutting down...");
    process.exit(1);
});

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`listening on port ${process.env.PORT}`);
});
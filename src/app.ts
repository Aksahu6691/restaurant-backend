import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { dishRoutes, testimonialRoutes, userRoutes } from './api';
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

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

export default app;
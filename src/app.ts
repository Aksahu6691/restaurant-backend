import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { dishRoutes, subscribeRoutes, testimonialRoutes, userRoutes } from './api';
import path from 'path';

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
// app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // enable static folder

app.use('/api/dish', dishRoutes);
app.use('/api/testimonial', testimonialRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscribe', subscribeRoutes);

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
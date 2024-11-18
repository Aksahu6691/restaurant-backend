import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from './UserModel';

export const userLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // 1. Check if email and password are provided
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide both email and password' });
            return;
        }

        // 2. Check if user exists
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // 3. Check if the provided password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // 4. Generate a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRETE_KEY as string,
            { expiresIn: 1 }
        );

        // 5. Return success response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

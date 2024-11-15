import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../api/user/UserModel';

export const protect: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Read the token from the authorization header
        const authHeader = req.headers.authorization;
        let token: string | undefined;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            res.status(401).json({ message: 'You are not authenticated!' });
            return;
        }

        // 2. Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRETE_KEY as string) as { id: string; };

        // 3. Check if the user exists
        const user = await UserModel.findById(decodedToken.id, { _id: 1, passwordUpdatedAt: 1 });
        if (!user) {
            res.status(404).json({ message: 'The user with the given token does not exist' });
            return;
        }

        // 4. Check if the user changed the password after the token was issued
        // if (await isPasswordChanged(decodedToken)) {
        //     res.status(401).json({ message: 'The password has been changed recently. Please log in again' });
        //     return;
        // }

        // 5. Attach user to request and proceed
        // req.user = user._id;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Helper function to check if the password has been changed after the token was issued
// const isPasswordChanged = async (token: DecodedToken): Promise<boolean> => {
//     const user = await UserModel.findById(token.id);
//     if (user?.passwordUpdatedAt) {
//         const pswdChangedTimestamp = Math.floor(user.passwordUpdatedAt.getTime() / 1000);
//         return token.iat < pswdChangedTimestamp;
//     }
//     return false;
// };
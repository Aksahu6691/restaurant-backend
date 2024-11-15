import { Request, RequestHandler, Response } from "express";
import UserModel from "./UserModel";
import bcrypt from 'bcrypt';

export const addUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, mobile, email, password } = req.body;

        // Validate required fields
        if (!name || !mobile || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' });
            return;
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            name,
            mobile,
            email,
            password: hashedPassword,
            passwordUpdatedAt: new Date()
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = id ? await UserModel.findById(id) : await UserModel.find();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, mobile } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(id, { name, mobile }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
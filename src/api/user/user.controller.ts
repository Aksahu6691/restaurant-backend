import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../../config/database.config";
import log from "../../utils/logger";
import { User } from "./user.model";

const userRepository = AppDataSource.getRepository(User);

export const addUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name, mobile, email, password } = req.body;

        // Validate required fields
        if (!name || !mobile || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Check if the user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' });
            return;
        }

        // Create new user instance
        const newUser = new User();
        newUser.name = name;
        newUser.mobile = mobile;
        newUser.email = email;
        newUser.password = password;
        newUser.passwordUpdatedAt = new Date();

        // Save the new user
        await userRepository.save(newUser);

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        log.error("Error creating user:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let user;

        // If ID is provided, fetch the specific user, else fetch all users
        if (id) {
            user = await userRepository.findOne({ where: { id } });
        } else {
            user = await userRepository.find();
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        log.error("Error retrieving user:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, mobile } = req.body;

        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.name = name ?? user.name;
        user.mobile = mobile ?? user.mobile;

        const updatedUser = await userRepository.save(user);

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        log.error("Error updating user:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await userRepository.remove(user); // Delete the user

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        log.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
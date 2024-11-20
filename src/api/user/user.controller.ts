import { Request, Response } from "express";
import { AppDataSource } from "../../config/database.config";
import log from "../../utils/logger";
import { User } from "./user.model";

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, mobile, email, password } = req.body;

        // Validate required fields
        if (!name || !mobile || !email || !password) {
            throw new Error("All fields are required");
        }

        // Check if the user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User with this email already exists");
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

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error: any) {
        log.error("Error creating user:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let user;

        // If ID is provided, fetch the specific user, else fetch all users
        if (id) {
            user = await userRepository.findOne({ where: { id } });
            if (!user) {
                throw new Error("User not found");
            }
        } else {
            user = await userRepository.find();
        }

        res.status(200).json(user);
    } catch (error: any) {
        log.error("Error retrieving user:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, mobile } = req.body;

        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }

        user.name = name ?? user.name;
        user.mobile = mobile ?? user.mobile;

        const updatedUser = await userRepository.save(user);

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error: any) {
        log.error("Error updating user:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }

        await userRepository.remove(user); // Delete the user

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        log.error("Error deleting user:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};
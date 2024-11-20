import { Request, Response } from "express";
import sendEmail from "../../utils/sendCustomMail";
import { isEmail } from "validator";

export const subscribeUser = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;

        if (!email) {
            throw new Error("Email is required");
        }

        if (!isEmail(email)) {
            throw new Error("Invalid email address");
        }

        await sendEmail(email);
        res.status(200).json({ message: "Subscription successful" });
    } catch (error: any) {
        console.error("Error subscribing user:", error.message);
        res.status(400).json({ error: error.message });
    }
};
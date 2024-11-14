import { Request, Response } from "express";
import fs from "fs";
import TestimonialModel from "./TestimonialModel";

// Extend the Request interface to include `file`
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const addTestimonial = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const { name, description, designation } = req.body;
        let image = "";

        if (req.file && req.file.mimetype) {
            image = `images/${req.file.filename}`;
        } else {
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        const data = new TestimonialModel({ image, name, description, designation });
        await data.save();
        res.status(201).json({ message: 'Data added successfully', data });
    } catch (error) {
        res.status(500).json({ message: 'Error adding testimonial', error });
    }
};

export const getTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const data = id ? await TestimonialModel.findById(id) : await TestimonialModel.find().sort({ _id: -1 });
        if (!data) {
            res.status(404).json({ message: 'Data not found' });
            return;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving testimonial', error });
    }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = await TestimonialModel.findByIdAndDelete(id);

        if (!data) {
            res.status(404).json({ message: 'Data not found' });
            return;
        }

        try {
            fs.unlinkSync(`public/${data.image}`);
        } catch (error) {
            console.log(error);
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Data', error });
    }
};
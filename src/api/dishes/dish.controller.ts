import { Request, Response } from "express";
import { AppDataSource } from "../../config/database.config";
import { Dish } from "./dish.model";
import log from "../../utils/logger";
import fs from "fs";

const dishRepository = AppDataSource.getRepository(Dish);

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const addDish = async (req: MulterRequest, res: Response) => {
    log.info("Add new dish");
    try {
        const { name, description } = req.body;
        let image = "";

        if (req.file && req.file.mimetype) {
            image = `images/${req.file.filename}`;
        } else {
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        const newDish = dishRepository.create({ image, name, description });
        const savedDish = await dishRepository.save(newDish);

        res.status(201).json({ message: 'Dish added successfully', dish: savedDish });
    } catch (error) {
        log.error("Error adding dish:", error);
        res.status(500).json({ message: 'Error adding dish', error });
    }
};

export const getDishes = async (req: Request, res: Response) => {
    log.info("Get all dishes...");
    try {
        const id = req.params.id;
        const dish = id ? await dishRepository.findOneBy({ id }) : await dishRepository.find();
        if (!dish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dish', error });
    }
};

export const deleteDish = async (req: Request, res: Response): Promise<void> => {
    log.info("Delete dish...");
    try {
        const { id } = req.params;

        const dish = await dishRepository.findOneBy({ id });

        if (!dish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }

        if (dish.image) {
            const imagePath = `public/${dish.image}`;
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (error) {
                console.error(`Error deleting image file: ${error}`);
            }
        }

        await dishRepository.delete({ id });

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error('Error deleting dish:', error);
        res.status(500).json({ message: 'Error deleting dish', error });
    }
};
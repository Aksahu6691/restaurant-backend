import { Request, Response } from "express";
import DishModel from "./DishModel";
import fs from "fs";

// Extend the Request interface to include `file`
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const addDish = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;
        let image = "";

        if (req.file && req.file.mimetype) {
            image = `images/${req.file.filename}`;
        } else {
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        const newDish = new DishModel({ image, name, description });
        await newDish.save();
        res.status(201).json({ message: 'Dish added successfully', dish: newDish });
    } catch (error) {
        res.status(500).json({ message: 'Error adding dish', error });
    }
};

export const getDishes = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const dish = id ? await DishModel.findById(id) : await DishModel.find().sort({ _id: -1 });
        if (!dish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dish', error });
    }
};

// export const updateDish = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const { image, name, description } = req.body;
//         const updatedDish = await DishModel.findByIdAndUpdate(
//             id,
//             { image, name, description },
//             { new: true, runValidators: true }
//         );
//         if (!updatedDish) {
//             res.status(404).json({ message: 'Dish not found' });
//             return;
//         }
//         res.status(200).json({ message: 'Dish updated successfully', dish: updatedDish });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating dish', error });
//     }
// };

export const deleteDish = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDish = await DishModel.findByIdAndDelete(id);

        if (!deletedDish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }

        try {
            fs.unlinkSync(`public/${deletedDish.image}`);
        } catch (error) {
            console.log(error);
        }

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dish', error });
    }
};
import express from "express";
import { addDish, deleteDish, getDishes } from "./DishController";
import { upload } from "../../utils/fileUpload";
import { protect } from "../../middleware/authentication";

const dishRoutes = express.Router();

dishRoutes.post('/add', protect, upload.single('image'), addDish)
    .get('/get/:id?', getDishes)
    // .put('/update/:id', updateDish)
    .delete('/delete/:id', protect, deleteDish);

export default dishRoutes;
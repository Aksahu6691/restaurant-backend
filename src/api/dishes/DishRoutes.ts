import express from "express";
import { addDish, deleteDish, getDishes } from "./DishController";
import { upload } from "../../utils/fileUpload";

const dishRoutes = express.Router();

dishRoutes.post('/add', upload.single('image'), addDish)
    .get('/get/:id?', getDishes)
    // .put('/update/:id', updateDish)
    .delete('/delete/:id', deleteDish);

export default dishRoutes;
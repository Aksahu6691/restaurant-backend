import express from "express";
import { upload } from "../../utils/fileUpload";
import { protect } from "../../middleware/authentication";
import { addDish, deleteDish, getDishes } from "./dish.controller";

const dishRoutes = express.Router();

dishRoutes.post('/add', upload.single('image'), addDish)
    .get('/get/:id?', getDishes)
    .delete('/delete/:id', deleteDish);

export default dishRoutes;
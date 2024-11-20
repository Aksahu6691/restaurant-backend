import express from "express";
import { upload } from "../../utils/fileUpload";
import { protect } from "../../middleware/authentication";
import { addDish, deleteDish, getDishes } from "./dish.controller";
import checkAuth from "../../middleware/checkAuth";

const dishRoutes = express.Router();

dishRoutes.post('/add', checkAuth, upload.single('image'), addDish)
    .get('/get/:id?', checkAuth, getDishes)
    .delete('/delete/:id', checkAuth, deleteDish);

export default dishRoutes;
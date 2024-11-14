import express from "express";
import { upload } from "../../utils/fileUpload";
import { addTestimonial, deleteTestimonial, getTestimonial } from "./TestimonialController";

const testimonialRoutes = express.Router();

testimonialRoutes.post('/add', upload.single('image'), addTestimonial)
    .get('/get/:id?', getTestimonial)
    .delete('/delete/:id', deleteTestimonial);

export default testimonialRoutes;
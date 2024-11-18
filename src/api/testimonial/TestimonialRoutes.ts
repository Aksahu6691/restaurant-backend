import express from "express";
import { upload } from "../../utils/fileUpload";
import { addTestimonial, deleteTestimonial, getTestimonial } from "./TestimonialController";
import { protect } from "../../middleware/authentication";

const testimonialRoutes = express.Router();

testimonialRoutes.post('/add', protect, upload.single('image'), addTestimonial)
    .get('/get/:id?', protect, getTestimonial)
    .delete('/delete/:id', protect, deleteTestimonial);

export default testimonialRoutes;
import express from "express";
import { upload } from "../../utils/fileUpload";
import { protect } from "../../middleware/authentication";
import { addTestimonial, deleteTestimonial, getTestimonial } from "./testimonial.controller";

const testimonialRoutes = express.Router();

testimonialRoutes.post('/add', protect, upload.single('image'), addTestimonial)
    .get('/get/:id?', getTestimonial)
    .delete('/delete/:id', protect, deleteTestimonial);

export default testimonialRoutes;
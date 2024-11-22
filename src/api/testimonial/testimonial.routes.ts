import express from "express";
import { upload } from "../../utils/fileUpload";
import { protect } from "../../middleware/authentication";
import { addTestimonial, deleteTestimonial, getTestimonial } from "./testimonial.controller";
import checkAuth from "../../middleware/checkAuth";
import checkAuth_old from "../../middleware/checkAuth_old";

const testimonialRoutes = express.Router();

testimonialRoutes.post('/add', checkAuth, upload.single('image'), addTestimonial)
    .get('/get/:id?', checkAuth_old, getTestimonial)
    .delete('/delete/:id', checkAuth, deleteTestimonial);

export default testimonialRoutes;
import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for the Dish model
interface MyTestimonial extends Document {
    name: string;
    image: string;
    description: string;
    designation: string;
}

const testimonialSchema = new Schema<MyTestimonial>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
});

// Create and export the Mongoose model
export default mongoose.model<MyTestimonial>('Testimonials', testimonialSchema);
import mongoose, { Document, Schema } from 'mongoose';
interface MyDish extends Document {
    image: string;
    name: string;
    description: string;
}

const dishSchema = new Schema<MyDish>({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model<MyDish>('Dishes', dishSchema);
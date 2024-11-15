import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface User extends Document {
    name: string;
    mobile: string;
    email: string;
    password: string;
    passwordUpdatedAt: Date;
}

export { User }

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordUpdatedAt: Date
});

// userSchema.method.comparePasswordInDb = async (pswd: string, pswdInDb: string)=>{
//     return await bcrypt.compare(pswd, pswdInDb);
// }

export default mongoose.model<User>('users', userSchema);
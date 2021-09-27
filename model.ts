import { Document, Schema, model } from 'mongoose';

interface UserInterface extends Document {
    mobileNumber: number;
    name: string;
    email: string;
    address: string;
    postalZip: number;
    region: string;
    country: string;
    message: string;
}

const schema = new Schema<UserInterface>({
    mobileNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    postalZip: { type: Number, required: false },
    region: { type: String, required: false },
    country: { type: String, required: false },
    message: { type: String, required: false },
    
});
  
export const UserModel = model<UserInterface>('User', schema);
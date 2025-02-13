import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    updated_at: { type: Date, required: true },
    prices: { type: [Number], required: true }, // Use an array of numbers
    rate: { type: Number, required: true },
    category: {
        type: String,
        enum: ['product', 'equipment'], // Define allowed values
        required: true
    }
});

export interface ProductEntity extends Document {
    name: string;
    updated_at: Date;
    prices: number[];
    rate: number;
    category: 'product' | 'equipment';
}

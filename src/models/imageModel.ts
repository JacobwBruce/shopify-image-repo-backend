import mongoose, { HookNextFunction } from 'mongoose';

export interface ImageDocument extends Document {
    user: string;
    url: string;
    description?: string;
    tags?: Array<String>;
}

const imageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        tags: [String],
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model<ImageDocument & mongoose.Document>('Image', imageSchema);

export default Image;

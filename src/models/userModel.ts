import mongoose, { HookNextFunction } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
    password?: string;
    name: string;
    email: string;
    _id: string;
    _doc: {
        password?: string;
        name: string;
        email: string;
        id: string;
    };
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    //@ts-ignore
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next: HookNextFunction) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserDocument & mongoose.Document>('User', userSchema);

export default User;

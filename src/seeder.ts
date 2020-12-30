import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import users from './data/users';
import User from './models/userModel';
import connectDB from './config/db';

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        //@ts-ignore
        const createdUsers = await User.insertMany(users);

        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(`Error importing data: ${err}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log('Data Destroyed!');

        process.exit();
    } catch (err) {
        console.error(`Error importing data: ${err}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

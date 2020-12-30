import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API is running...');
});

app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀\nPort: ${PORT}`);
});

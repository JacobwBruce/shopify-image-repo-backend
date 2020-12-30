import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀\nPort: ${PORT}`);
});

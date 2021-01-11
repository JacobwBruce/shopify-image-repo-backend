import express, { Router } from 'express';
import {
    deleteImage,
    editImageById,
    getImages,
    getImage,
    getUserImages,
} from '../controllers/imageController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.get('/user', protect, getUserImages);
router.route('/:url').get(getImage).delete(protect, deleteImage).put(protect, editImageById);
router.get('/', getImages);

export default router;

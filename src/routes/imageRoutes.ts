import express, { Router } from 'express';
import { deleteImage, getAllImages, getImage, getUserImages } from '../controllers/imageController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.get('/user', protect, getUserImages);
router.route('/:url').get(getImage).delete(protect, deleteImage);
router.get('/', getAllImages);

export default router;

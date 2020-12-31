import express, { Router } from 'express';
import { getAllImages, getImage, getUserImages } from '../controllers/imageController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.get('/user', protect, getUserImages);
router.get('/:url', getImage);
router.get('/', getAllImages);

export default router;

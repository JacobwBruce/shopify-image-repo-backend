import express, { Router } from 'express';
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
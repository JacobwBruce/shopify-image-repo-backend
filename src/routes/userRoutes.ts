import express, { Router } from 'express';
import {
    authUser,
    getUserById,
    getUserProfile,
    registerUser,
    updateUserProfile,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.get('/:id', getUserById);

export default router;

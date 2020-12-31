import express, { Router } from 'express';
import { getImage } from '../controllers/imageController';
const router: Router = express.Router();

router.get('/:url', getImage);

export default router;

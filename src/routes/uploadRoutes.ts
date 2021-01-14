import express from 'express';
import Image from '../models/imageModel';
const router = express.Router();

router.post('/saveimage', async (req: express.Request, res: express.Response) => {
    try {
        const image = new Image({
            user: req.body.userId,
            url: req.body.url,
            description: req.body.description,
            tags: req.body.tags,
        });

        const createdImage = await image.save();
        res.status(201).json(createdImage);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;

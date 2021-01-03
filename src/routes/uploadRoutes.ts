import express from 'express';
import multer from 'multer';
import path from 'path';
import Image from '../models/imageModel';
import fs from 'fs';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file: Express.Multer.File, callback: multer.FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback(new Error('Images only!'));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    },
});

router.post('/', upload.single('image'), async (req: express.Request, res: express.Response) => {
    res.send(`/${req.file.path}`);
});

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

router.delete('/:filename', async (req: express.Request, res: express.Response) => {
    fs.unlinkSync(`./images/${req.params.filename}`);
    res.json({ message: 'Image removed' });
});

export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import UserRequest from '../interfaces/UserRequest';
import Image from '../models/imageModel';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
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

router.get('/:url', (req: express.Request, res: express.Response) => {
    const url = req.params.url;
    res.sendFile(`/uploads/${url}`, {
        root: './',
    });
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

export default router;

import express from 'express';
import UserRequest from '../interfaces/UserRequest';
import Image from '../models/imageModel';
import fs from 'fs';

// @desc    get an image by file name
// @route   GET /api/images/:url
// @access  Public
export const getImage = (req: express.Request, res: express.Response) => {
    const url = req.params.url;
    res.sendFile(`/images/${url}`, {
        root: './',
    });
};

// @desc    get all images
// @route   GET /api/images/
// @access  Public
export const getAllImages = async (req: express.Request, res: express.Response) => {
    const images = await Image.find({});

    res.json(images.reverse());
};

// @desc    get logged in users images
// @route   GET /api/images/user
// @access  Private
export const getUserImages = async (req: UserRequest, res: express.Response) => {
    const images = await Image.find({ user: req.user!._id });

    res.json(images.reverse());
};

// @desc    delete an image from id
// @route   DELETE /api/images/:id
// @access  Private
export const deleteImage = async (req: UserRequest, res: express.Response) => {
    const image = await Image.findById(req.params.url);
    if (!image) {
        res.status(404);
        throw new Error('Image not found');
    } else {
        fs.unlinkSync(`.${image.url}`);
        await image.remove();
        res.json({ message: 'Image deleted' });
    }
};

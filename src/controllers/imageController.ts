import express from 'express';
import UserRequest from '../interfaces/UserRequest';
import Image from '../models/imageModel';

// @desc    get images
// @route   GET /api/images/
// @access  Public
export const getImages = async (req: express.Request, res: express.Response) => {
    const keyword = req.query.keyword
        ? {
              tags: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    //@ts-ignore
    const images = await Image.find(keyword);

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
        await image.remove();
        res.json({ message: 'Image deleted' });
    }
};

// @desc    edit an image from id
// @route   PUT /api/images/:id
// @access  Private
export const editImageById = async (req: UserRequest, res: express.Response) => {
    const image = await Image.findById(req.params.url);
    if (!image) {
        res.status(404);
        throw new Error('Image not found');
    } else {
        image.tags = req.body.tags;
        image.description = req.body.description;
        const updatedImage = image.save();
        res.json(updatedImage);
    }
};

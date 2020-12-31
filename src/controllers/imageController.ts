import express from 'express';
import UserRequest from '../interfaces/UserRequest';
import Image from '../models/imageModel';

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

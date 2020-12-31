import express from 'express';

// @desc    get an image by file name
// @route   POST /api/images/:url
// @access  Public
export const getImage = (req: express.Request, res: express.Response) => {
    const url = req.params.url;
    res.sendFile(`/images/${url}`, {
        root: './',
    });
};

const model = require ('../models');

// Flipbook related controllers

function getAllFlipbooksByQuery (req, res, next) {
    return model.flipbook.getAllFlipbooksByQuery(req.query)
        .then(flipbooks => {
            res.status(200).json({ data: flipbooks });
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function getFlipbookByName (req, res, next) {
    return model.flipbook.getFlipbookByName(req.params.name, req.query.frameCnt)
        .then(flipbook => {
            if (Array.isArray(flipbook)){
                res.status(200).json({ data: flipbook[0] });
            } else {
                res.status(200).json({ data: flipbook });
            }
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function createNewFlipbook (req, res, next) {
    return model.flipbook.createNewFlipbook(req.body)
        .then(flipbook => {
            res.status(200).json({ data: flipbook});
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function deleteFlipbook (req, res, next) {
    return model.flipbook.deleteFlipbook(req.params.name)
        .then(flipbook => {
            res.status(200).json({ data: flipbook});
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function createNewGifFromFlipbook (req, res, next) {
    return model.flipbook.getAllFramesByFlipBook(req.params.name)
        .then(gifInfo => {
            res.status(200).json({ data: gifInfo[0] });
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}


// Frame Related Controllers

function getFrameById (req, res, next) {
    return model.flipbook.getFrameById(req.params.name, req.params.frame_index, req.query.lightBox)
        .then(frame => {
            res.status(200).json({ data: frame });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function createNewFrame(req, res, next) {
    return model.flipbook.createNewFrame(req.params.name, req.body)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function updateFrame(req, res, next) {
    console.log(req);
    return model.flipbook.updateFrame(req.params.name, req.body.imgURL, req.params.frame_index)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function deleteFrameById(req, res, next) {
    return model.flipbook.deleteFrameById(req.params.name, req.params.frame_index)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

module.exports = {
    getFrameById,
    createNewFrame,
    updateFrame,
    deleteFrameById,
    getAllFlipbooksByQuery,
    getFlipbookByName,
    createNewGifFromFlipbook,
    createNewFlipbook,
    deleteFlipbook
};
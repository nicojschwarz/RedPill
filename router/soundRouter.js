const express = require('express');
const sound = require('../util/sound');

const soundRouter = express.Router();

soundRouter.post("/", (req, res, next) => {
    if (!req.files || !req.files.sound)
        return res.status(400).send('No files were uploaded.');

    const mime = req.files.sound.mimetype
    if (mime !== 'audio/mpeg3' &&
        mime !== 'audio/x-mpeg3' &&
        mime !== 'video/mpeg3' &&
        mime !== 'video/x-mpeg3')
        return res.status(400).send('Wrong file mimetype.');

    req.files.sound.mv("./wakeup.mp3")
        .catch(err => { res.status(400).send(err) })
        .then(() => { send("success"); });
});

soundRouter.get("/play", (req, res, next) => { 
    sound.play();
    res.send('success');
});

soundRouter.get("/err", (req, res, next) => { 
    res.send(sound.hadError);
});

exports = module.exports = soundRouter;
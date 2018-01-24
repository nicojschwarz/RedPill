const express = require('express'); 
const hw = require('../util/hardware');

const ledRouter = express.Router();
ledRouter.get("/:cmd", (req, res, next) => {
    try {
        hw.i2cWrite(req.params.cmd);
        res.send("success");
    } catch (err) { next(err); }
});

exports = module.exports = ledRouter;

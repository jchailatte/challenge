'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');
const path = require('path');

// server config
const port = process.env.PORT || 3000;

//serving static files
app.use(express.static(path.join(__dirname, '../public')));

// register routes
registerRoutes(app);

//error handling
const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: "Something failed" });
    } else {
        next(err);
    }
};
const errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render("error", { error: err });
};
// error handler
app.use(clientErrorHandler);
app.use(errorHandler);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

module.exports = start;



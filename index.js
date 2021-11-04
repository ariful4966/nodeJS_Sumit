require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./RouteHandler/todoHandler');
const userHandler = require('./RouteHandler/userHandler');
// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
    .connect('mongodb://localhost:27017/todos')
    .then(() => {
        console.log('Database Connection Successfully');
    })
    .catch((err) => {
        console.log(err.message);
    });
// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(4000, () => {
    console.log('App listening at post 4000');
});

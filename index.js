const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./RouteHandler/todoHandler');
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

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.listen(4000, () => {
    console.log('App listening at post 4000');
});

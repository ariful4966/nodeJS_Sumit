const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
const adminRoute = express.Router();
const port = 4000;
const handler = require('./handler');

app.use(cookieParser());

app.use('/admin', adminRoute);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

adminRoute.get('/dashboard', (req, res) => {
    console.log(req.protocol);
    res.send('We are in admin Dashboard');
});

app.get('/user/:id', handler);

app.post('/user', (req, res) => {
    console.log(req.route);
    res.send('Hello World Post');
});
app.get('/user', (req, res) => {
    console.log(req.route);
    res.send('Hello World Get');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

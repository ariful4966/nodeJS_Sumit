const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
const adminRoute = express.Router();
const port = 4000;

app.use(cookieParser());

app.use('/admin', adminRoute);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

adminRoute.get('/dashboard', (req, res) => {
    console.log(req.protocol);
    res.send('We are in admin Dashboard');
});

app.get('/user/:id', (req, res) => {
    console.log(req.secure);
    res.send('Hello World');
});

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('Hello World Post');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

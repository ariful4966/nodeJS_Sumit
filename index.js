const express = require('express');

const app = express();
const adminRoute = express.Router();
const port = 4000;
app.use('/admin', adminRoute);

adminRoute.get('/dashboard', (req, res) => {
    console.log(req.originalUrl);
    console.log(req.url);
    res.send('We are in admin Dashboard');
});

app.get('/user/:id', (req, res) => {
    console.log(req.originalUrl);
    console.log(req.url);
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

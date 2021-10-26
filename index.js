const express = require('express');

const port = 4000;
const app = express();

const myMiddleware = (req, res, next) => {
    console.log('I am logging');
    next();
};

const myMiddleware2 = (req, res, next) => {
    console.log('I am logging 2');
    next();
};

app.use(myMiddleware);

app.use(myMiddleware2);

app.get('/', (req, res) => {
    res.send('This is home page');
});

app.get('/about', myMiddleware, myMiddleware2, (req, res) => {
    res.send('About page is hare');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

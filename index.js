const express = require('express');

const port = 4000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.format({
    //     'text/plain': () => {
    //         res.send('hi');
    //     },
    //     'text/html': () => {
    //         res.render('pages/about', {
    //             name: 'Bangladesh',
    //         });
    //     },
    //     'application/json': () => {
    //         res.json({
    //             message: 'About',
    //         });
    //     },
    //     default: () => {
    //         res.status(406).send('Not acceptable');
    //     },
    res.cookie('name', 'Hello Aysha Arif', {});
    res.end();
    // });
});
app.get('/about', (req, res) => {
    res.end('This is About Page');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

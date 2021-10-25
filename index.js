const express = require('express');

const port = 4000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World Get');
});
app.get('/about', (req, res) => {
    console.log(res.headersSent);
    // res.send('This is About Page');
    res.render('pages/about', {
        name: 'Bangladesh',
    });
    console.log(res.headersSent);
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

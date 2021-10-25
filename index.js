const express = require('express');

const port = 4000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('Hello World Get');
    // res.end();
    // res.json({
    //     name: 'Ariful Islam Raju',
    // });
    // res.status(200);
    // res.end();
    res.sendStatus(200);
});
app.get('/about', (req, res) => {
    res.end('This is About Page');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

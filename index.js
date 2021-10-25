const express = require('express');

const port = 4000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('Hello World Get');
    // res.end();
    res.json({
        name: 'Ariful Islam Raju',
    });
});
app.get('/about', (req, res) => {
    res.end('This is About Page');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

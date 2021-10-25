const express = require('express');

const port = 4000;
const app = express();

app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
    res.send('Hello Mike testing');
});

app.get('/', (req, res) => {
    res.set('Title', 'Ariful islam Raju');
    console.log(res.get('Title'));
    res.end();
});
app.get('/about', (req, res) => {
    res.end('This is About Page');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

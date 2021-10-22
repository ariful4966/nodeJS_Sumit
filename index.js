const express = require('express');

const app = express();
const port = 4000;
app.set('view engine', 'ejs');

app.route('/about/mission')
    .get((req, res) => {
        res.render('pages/about');
    })
    .post((req, res) => {
        res.send('welcome to application home post');
    })
    .put((req, res) => {
        res.send('welcome to application home put');
    });

app.get('/about/mission', (req, res) => {
    res.send('welcome to application home');
});

app.post('/', (req, res) => {
    res.send('welcome to application home post');
});

app.put('/', (req, res) => {
    res.send('welcome to application home put');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

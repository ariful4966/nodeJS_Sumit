const express = require('express');

const app = express();
const port = 4000;

app.use(
    express.static(`${__dirname}/public/`, {
        index: 'home.html',
    })
);

app.get('/', (req, res) => {
    res.send('This is home page');
});
app.post('/', (req, res) => {
    res.send('This is home page with post request');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

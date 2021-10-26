const express = require('express');

const port = 4000;
const app = express();
const adminRouter = express.Router();
const logger = (req, res, next) => {
    console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method}-${req.originalUrl}- ${
            req.protocol
        } - ${req.ip}`,
    );
    next();
};
adminRouter.use(logger);
app.use('/admin', adminRouter);

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

app.get('/', (req, res) => {
    res.send('This is home page');
});

app.get('/about', (req, res) => {
    res.send('About page is hare');
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

const express = require('express');
const cookieParser = require('cookie-parser');

const port = 4000;
const app = express();
const adminRouter = express.Router();

const loggerWrapper = (options) =>
    function (req, res, next) {
        if (options.log) {
            console.log(
                `${new Date(Date.now()).toLocaleString()} - ${req.method}-${req.originalUrl}- ${
                    req.protocol
                } - ${req.ip}`,
            );
            next();
        } else {
            throw new Error('Fails to log');
        }
    };
adminRouter.use(
    loggerWrapper({
        log: false,
    }),
);

app.use('/admin', adminRouter);
app.use(cookieParser());
app.use(express.json());

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

app.get('/', (req, res) => {
    res.send('This is home page');
});

app.get('/about', (req, res) => {
    res.send('About page is hare');
});
const errorMiddleware = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('There was a server side error!');
};
adminRouter.use(errorMiddleware);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

const adminRouter = require('express').Router();

adminRouter.get('/', (req, res) => {
    res.send('Dashboard');
});
adminRouter.get('/login', (req, res) => {
    res.send('User Login Page');
});
module.exports = adminRouter;

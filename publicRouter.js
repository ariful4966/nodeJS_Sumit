const publicRouter = require('express').Router();

publicRouter.param((param, option) => (req, res, next, val) => {
    if (val === option) {
        next();
    } else {
        res.sendStatus(403);
    }
});
publicRouter.param('user', '12');

publicRouter.get('/:user', (req, res) => {
    res.send('Hello Admin');
});
publicRouter.get('/about', (req, res) => {
    res.send('About page is here');
});
module.exports = publicRouter;

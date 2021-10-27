const publicRouter = require('express').Router();

// s

// publicRouter.all('*', log);

publicRouter.param('user', (req, res, next, id) => {
    req.user = id === '1' ? 'Admin' : 'Anonymous';
    console.log('I am called once');
    next();
});

publicRouter.get('/:user', (req, res, next) => {
    console.log('This also matches');
    next();
});

publicRouter.get('/:user', (req, res) => {
    res.send(`Hello ${req.user}`);
});
publicRouter.get('/about', (req, res) => {
    res.send('About page is here');
});
module.exports = publicRouter;

const publicRouter = require('express').Router();

// publicRouter
//     .route('/user')
//     .all((req, res, next) => {
//         console.log('I am logging something');
//         next();
//     })
//     .get((req, res) => {
//         res.send('GET');
//     })
//     .post((req, res) => {
//         res.send('POST');
//     })
//     .put((req, res) => {
//         res.send('UPDATE');
//     })
//     .delete((req, res) => {
//         res.send('DELETE');
//     });

publicRouter.use((req, res, next) => {
    console.log('Logging');
    next();
});
publicRouter.get('/user', (req, res) => {
    res.send('user router');
});

module.exports = publicRouter;

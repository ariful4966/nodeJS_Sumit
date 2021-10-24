const handler = (req, res) => {
    // console.log(req.accepts('json'));
    if (req.accepts('html')) {
        req.render();
    } else {
        res.send('hello world');
    }
    res.send('Hello World');
};
module.exports = handler;

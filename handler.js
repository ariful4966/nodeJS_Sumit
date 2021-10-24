const handler = (req, res) => {
    console.log(req.app.get('view engine'));
    res.send('Hello World');
};
module.exports = handler;

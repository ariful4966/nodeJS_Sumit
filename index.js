const express = require('express');
const adminRouter = require('./adminRouter');
const publicRouter = require('./publicRouter');

const app = express();
const port = process.env.POST || 4000;

app.use('/admin', adminRouter);
app.use('/', publicRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

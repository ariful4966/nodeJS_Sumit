const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', [
    (req, res, next) => {
        fs.readFile('/file-doesnt-exist', 'urt-8', (err, data) => {
            console.log(data);
            next(err);
        });
    },
    (req, res, next) => {
        console.log(data.property);
    },
]);
// setTimeout(() => {
//     try {
//         console.log(a);
//     } catch (err) {
//         next(err);
//     }
// });
// fs.readFileSync('/file-does-not-exist', (err, data) => {
//     if (err) {
//         next(err);
//     } else {
//         res.send(data);
//     }
// });
// });
app.use((req, res, next) => {
    console.log(' I am not called!');
    next();
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There was a problem');
    } else if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.send('There was an error!');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

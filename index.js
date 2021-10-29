const express = require('express');
const multer = require('multer');

const app = express();
const UPLOADS_FOLDER = './Upload/';
const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 1000 * 1000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
        }
    },
});
app.get('/', (req, res) => {
    res.send('Welcome to express app');
});

app.post('/', upload.single('avatar'), (req, res) => {
    console.log(req);
    res.send('Hello files');
});
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('There was an upload error!');
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send('Success');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

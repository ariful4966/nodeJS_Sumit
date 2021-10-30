const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const UPLOADS_FOLDER = './Upload/';
// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        // important file.pdf
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;
        cb(null, fileName + fileExt);
    },
});
const upload = multer({
    // dest: UPLOADS_FOLDER,
    storage,
    limits: {
        fileSize: 1000 * 1000,
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
            }
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only .pdf format allowed!'));
            }
        } else {
            cb(new Error('There was an unknown error!'));
        }
    },
});
app.get('/', (req, res) => {
    res.send('Welcome to express app');
});

app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'doc', maxCount: 1 },
    ]),
    (req, res) => {
        console.log(req.files);
        res.send('Hello files');
    }
);
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

import express from 'express';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

const port = 8080;
const app = express();

app.use('/dist', express.static('dist'));
app.use('/public', express.static(path.join(__dirname, '../src/assets')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});
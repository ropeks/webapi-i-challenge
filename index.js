// implement your API here
const express = require('express');
const db = require('./data/db');
const port = 3000;
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.status(200)
                .json(data);
        })
        .catch(err => {
            res.status(500)
                .json({ err: 'Information cannot be retrieved' });
        })
});

server.listen(port, () => {
    console.log('Listening on port ' + port);
})
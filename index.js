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

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200)
                    .json(data);
            } else {
                res.status(404)
                    .json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ err: 'Information cannot be retrieved' });
        })
});

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(data => {
            if (data) {
                res.status(200)
                    .json(data)
            } else {
                res.status(404)
                    .json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ err: 'Information cannot be retrieved' })
        });
});

server.listen(port, () => {
    console.log('Listening on port ' + port);
})
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
                .json({ error: 'Information cannot be retrieved' });
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
                    .json({ error: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: 'Information cannot be retrieved' });
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
                    .json({ error: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: 'Information cannot be retrieved' })
        });
});

server.post('/api/users/', (req, res) => {
    const { name, bio } = req.body;
    if ( name || bio ) {
        db.insert(req.body)
            .then(data => {
                res.status(201)
                    .json(data)
            })
            .catch(err => {
                res.status(500)
                    .json({ error: 'There was an error while saving the user to the database' })
            })
    } else {
        res.status(400)
            .json({ error: 'Please provide name and bio for the user.' })
    };
})

server.listen(port, () => {
    console.log('Listening on port ' + port);
})
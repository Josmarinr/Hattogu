const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Create a new user
router.post('/users', (req, res) => {
    const user = new userSchema(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all users
router.get('/users', (req, res) => {
    userSchema.find({}).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a user by Cedula
router.get('/users/:cedula', (req, res) => {
    const _cedula = req.params.cedula;
    userSchema.find({cedula: _cedula}).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a user by Cedula
router.put('/users/:cedula', (req, res) => {
    const _cedula = req.params.cedula;
    const { name, email, password, rol, money } = req.body;
    userSchema
        .updateMany({cedula: _cedula}, { $set: { name, email, password, rol, money } })
        .then(user => {res.status(200).send(user);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a user by Cedula
router.delete('/users/:cedula', (req, res) => {
    const _cedula = req.params.cedula;
    userSchema.findOneAndDelete({cedula: _cedula}).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});


module.exports = router;
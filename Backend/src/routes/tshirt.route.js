const express = require('express');
const tshirtSchema = require('../models/tshirt');


const router = express.Router();

//Create a new tshirt
router.post('/tshirts', (req, res) => {
    const tshirt = new tshirtSchema(req.body);
    tshirt.save().then(() => {
        res.status(201).send(tshirt);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all tshirts
router.get('/tshirts', (req, res) => {
    tshirtSchema.find({}).then(tshirts => {
        res.send(tshirts);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a tshirt by Code
router.get('/tshirts/:code', (req, res) => {
    const _code = req.params.code;
    tshirtSchema.find({code: _code}).then(tshirt => {
        if(!tshirt) {
            return res.status(404).send();
        }
        res.send(tshirt);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a tshirt by Code
router.put('/tshirts/:code', (req, res) => {
    const _code = req.params.code;
    const { name, size, color, price, stock, image } = req.body;
    tshirtSchema
        .updateOne({code: _code}, { $set: { name, size, color, price, stock, image } })
        .then(tshirt => {res.status(201).send(tshirt);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a tshirt by Code
router.delete('/tshirts/:code', (req, res) => {
    const _code = req.params.code;
    tshirtSchema.findOneAndDelete({code: _code}).then(tshirt => {
        if(!tshirt) {
            return res.status(404).send();
        }
        res.send(tshirt);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update Stock a tshirt by Code
router.put('/tshirts/:code', (req, res) => {
    const _code = req.params.code;
    const { stock } = req.body;
    tshirtSchema
        .updateOne({code: _code}, { $set: { stock } })
        .then(() => {res.status(201).send();
    }).catch(err => {
        res.status(400).send(err)});
});

module.exports = router;
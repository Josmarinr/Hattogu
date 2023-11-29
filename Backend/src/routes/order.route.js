const express = require('express');
const orderSchema = require('../models/order');
const order = require('../models/order');

const router = express.Router();

//Create a new order
router.post('/orders', (req, res) => {
    const order = new orderSchema(req.body);
    order.save().then(() => {
        res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all orders
router.get('/orders', (req, res) => {
    orderSchema.find({}).then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get an order by code
router.get('/orders/:code', (req, res) => {
    const _code = req.params.code;
    orderSchema.find({code: _code}).then(order => {
        if(!order) {
            return res.status(404).send();
        }
        res.send(order);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update an order by Code
router.put('/orders/:code', (req, res) => {
    const _code = req.params.code;
    const {tshirt, stamped, quantity, total } = req.body;
    orderSchema
        .updateOne({code: _code}, { $set: { tshirt, stamped, quantity, total } })
        .then(order => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Delete an order by Code
router.delete('/orders/:code', (req, res) => {
    const _code = req.params.code;
    orderSchema.findOneAndDelete({code: _code}).then(order => {
        if(!order) {
            return res.status(404).send();
        }
        res.send(order);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update Quantity an order by Code
router.put('/orders/:code', (req, res) => {
    const _code = req.params.code;
    const { quantity } = req.body;
    orderSchema
        .updateOne({code: _code}, { $set: { quantity } })
        .then(order => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Update Total an order by Code
router.put('/orders/:code', (req, res) => {
    const _code = req.params.code;
    const { total } = req.body;
    orderSchema
        .updateOne({code: _code}, { $set: { total } })
        .then(order => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Update Tshirt an order by Code
router.put('/orders/:code', (req, res) => {
    const _code = req.params.code;
    const { tshirt } = req.body;
    orderSchema
        .updateOne({code: _code}, { $set: { tshirt } })
        .then(order => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Update Stamped an order by Code
router.put('/orders/:code', (req, res) => {
    const _code = req.params.code;
    const { stamped } = req.body;
    orderSchema
        .updateOne({code: _code}, { $set: { stamped } })
        .then(order => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)
    });
});

module.exports = router;
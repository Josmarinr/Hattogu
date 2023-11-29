const express = require('express');
const paymentSchema = require('../models/payment');
const payment = require('../models/payment');

const router = express.Router();

//Create a new payment
router.post('/payments', (req, res) => {
    const payment = new paymentSchema(req.body);
    payment.save().then(() => {
        res.status(201).send(payment);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all payments
router.get('/payments', (req, res) => {
    paymentSchema.find({}).then(payments => {
        res.send(payments);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a payment by Code
router.get('/payments/:code', (req, res) => {
    const _code = req.params.code;
    paymentSchema.find({code: _code}).then(payment => {
        if(!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a payment by User
router.get('/payments/user/:user', (req, res) => {
    const _user = req.params.user;
    paymentSchema.find({user: _user}).then(payment => {
        if(!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a payment by Code
router.put('/payments/:code', (req, res) => {
    const _code = req.params.code;
    const { user, order, date, methodPayment, success } = req.body;
    paymentSchema
        .updateOne({code: _code}, { $set: { user, order, date, methodPayment, success } })
        .then(payment => {res.status(201).send(payment);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a payment by Code
router.delete('/payments/:code', (req, res) => {
    const _code = req.params.code;
    paymentSchema.findOneAndDelete({code: _code}).then(payment => {
        if(!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;
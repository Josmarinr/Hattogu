const express = require('express');
const methodPaymentSchema = require('../models/methodPayment');

const router = express.Router();

//Create methodPayment
router.post('/methodPayments', async (req, res) => {
    const methodPayment = new methodPaymentSchema(req.body);
    methodPayment.save().then(() => {
        res.status(201).send(methodPayment);
    }).catch(error => {
        res.status(400).send(error);
    });
});

//Get all methodPayments
router.get('/methodPayments', async (req, res) => {
    methodPaymentSchema.find({}).then((methodPayments) => {
        res.send(methodPayments);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Get methodPayment by Code
router.get('/methodPayments/:code', async (req, res) => {
    const _code = req.params.code;
    methodPaymentSchema.findOne({code: _code}).then((methodPayment) => {
        if(!methodPayment){
            return res.status(404).send();
        }
        res.send(methodPayment);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Update methodPayment by Code
router.put('/methodPayments/:code', async (req, res) => {
    const _code = req.params.code;
    const {method} = req.body;
    methodPaymentSchema.updateOne({code: _code}, {$set: {method}}).then(methodPayment => {
        res.status(201).send(methodPayment);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Delete methodPayment by Code
router.delete('/methodPayments/:code', async (req, res) => {
    const _code = req.params.code;
    methodPaymentSchema.findOneAndDelete({code: _code}).then(methodPayment => {
        if(!methodPayment){
            return res.status(404).send();
        }
        res.send(methodPayment);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

module.exports = router;
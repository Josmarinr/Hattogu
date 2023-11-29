const express = require('express');
const stampedSchema = require('../models/stamped');

const router = express.Router();

//Create a new stamped
router.post('/stampeds', (req, res) => {
    const stamped = new stampedSchema(req.body);
    stamped.save().then(() => {
        res.status(201).send(stamped);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all stampeds
router.get('/stampeds', (req, res) => {
    stampedSchema.find({}).then(stampeds => {
        res.send(stampeds);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a stamped by Code
router.get('/stampeds/:code', (req, res) => {
    const _code = req.params.code;
    stampedSchema.find({code: _code}).then(stamped => {
        if(!stamped) {
            return res.status(404).send();
        }
        res.send(stamped);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a stamped by Artist
router.get('/stampeds/artist/:artist', (req, res) => {
    const _artist = req.params.artist;
    stampedSchema.find({artist: _artist}).then(stamped => {
        if(!stamped) {
            return res.status(404).send();
        }
        res.send(stamped);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a stamped by Code
router.put('/stampeds/:code', (req, res) => {
    const _code = req.params.code;
    const { name, price, image} = req.body;
    stampedSchema
        .updateOne({code: _code}, { $set: { name, price, image} })
        .then(stamped => {res.status(201).send(stamped);
    }).catch(err => {
        res.status(400).send(err)});
});

//Update a stamped by Artist
router.put('/stampeds/artist/:artist', (req, res) => {
    const _artist = req.params.artist;
    const { name, price, image} = req.body;
    stampedSchema
        .updateOne({artist: _artist}, { $set: { name, price, image} })
        .then(stamped => {res.status(201).send(stamped);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a stamped by Code
router.delete('/stampeds/:code', (req, res) => {
    const _code = req.params.code;
    stampedSchema.findOneAndDelete({code: _code}).then(stamped => {
        if(!stamped) {
            return res.status(404).send();
        }
        res.send(stamped);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Delete a stamped by Artist
router.delete('/stampeds/artist/:artist', (req, res) => {
    const _artist = req.params.artist;
    stampedSchema.findOneAndDelete({artist: _artist}).then(stamped => {
        if(!stamped) {
            return res.status(404).send();
        }
        res.send(stamped);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;
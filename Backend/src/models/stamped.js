const mongoose = require('mongoose');

const stampedSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: [true, 'Code is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true
    },
    artist: {
        type: Number,
        required: [true, 'Artist is required'],
        trim: true
    }
});

module.exports = mongoose.model('Stamped', stampedSchema);
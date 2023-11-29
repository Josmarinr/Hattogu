const mongoose = require('mongoose');

const tshirtSchema = new mongoose.Schema({
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
    size: {
        type: String,
        required: [true, 'Size is required'],
        trim: true
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true
    }
}); 

module.exports = mongoose.model('Tshirt', tshirtSchema);
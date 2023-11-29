const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true,
        required: [true, 'Code is required'],
        trim: true
    },
    tshirt: [{
        type: Number,
        ref: 'Tshirt'
    }],
    stamped: [{
        type: Number,
        ref: 'Stamped'
    }],
    quantity: [{
        type: Number,
        required: [true, 'Quantity is required'],
        trim: true
    }],
    total: {
        type: Number,
        required: [true, 'Total is required'],
        trim: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
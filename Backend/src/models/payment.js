const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        trim: true
    },
    user: {
        type: Number,
        ref: 'User'
    },
    order: {
        type: Number,
        ref: 'Order'
    },
    date: {
        type: Date,
        default: Date.now
    },
    methodPayment: {
        type: Number,
        required: true,
        trim: true
    },
    success: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
const mongoose = require('mongoose');

const methodPaymentSchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true,
        required: [true, 'Codigo es requerido'],
        trim: true
    },
    method: {
        type: String,
        required: [true, 'Metodo es requerido'],
        enum: ['efectivo','tarjeta','nequi', 'daviplata','pse'],
        trim: true
    },
});

module.exports = mongoose.model('MethodPayment', methodPaymentSchema);
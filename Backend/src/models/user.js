const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate(value) {
            if(value.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
        }
    },
    rol: {
        type: String,
        required: [true, 'Role es requerido'],
        trim: true,
        enum: ['admin','artista', 'usuario'],
        default: 'usuario'
    },
    money: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Money must be a positive number');
            }
        }
    },
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
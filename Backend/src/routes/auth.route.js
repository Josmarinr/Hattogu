const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');

const router = express.Router();

//Auth y validacion de token
router.post('/login', async (req, res) => {
    const { cedula, password } = req.body;

    try{
        const user = await userRouter.findOne({cedula});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).send('Cedula o password incorrecto');
        }

        const token = jwt.sign({cedula: user.cedula, rol: user.rol}, 'secreto', {expiresIn: '8h'});

        res.status(200).send(token);
    }catch(error){
        res.status(500).send(error);
    }
});

//Verificar token
function verificarToken(req, res, next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).send('Token no proporcionado');
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if(err){
            return res.status(401).send('Token expirado o incorrecto');
        }
        req.user = decoded;
        next();
    });
}

module.exports = router;
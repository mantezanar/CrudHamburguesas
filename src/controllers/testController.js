const e = require('express');
const jwt = require('jsonwebtoken');
const controller = {};
controller.test = (req, res) =>{
    const token = jwt.verify(req.cookies.token.token, process.env.API_KEY);
    if(token.rol === 'cliente'){
        res.send("cliente id: "+token.cliente_id.toString());
    }else if(token.rol === 'admin'){
        res.send('testAdmin');
    }
};
module.exports = controller;
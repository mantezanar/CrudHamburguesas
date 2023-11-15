
const regUserController = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
regUserController.userRegpage = (req, res) => {
    res.render('userReg');
};

regUserController.userReg = async (req, res) => {   
    try {
        const { email: correo, password: contrasenia } = req.body;

        if (contrasenia[0] !== contrasenia[1]) {
            return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
        }

        if (!correo || !contrasenia) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        const hashedPassword = await bcrypt.hash(contrasenia[0], 10);
        req.getConnection((err, conn) => {
            const query = 'INSERT INTO cliente (correo, contrasenia) VALUES (?, ?)';
            const values = [correo, hashedPassword];
            conn.query(query, values, (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
                }
                const query2 = 'SELECT cliente_id FROM cliente WHERE correo = ?';
                const values2 = [correo];
                conn.query(query2, values2, (err, rows) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ mensaje: 'Error interno del servidor.' });
                    }

                    const cliente_id = rows.length > 0 ? rows[0].cliente_id : null;
                    if (!cliente_id) {
                        return res.status(500).json({ mensaje: 'No se encontró el cliente.' });
                    }

                    const token = jwt.sign({ cliente_id, rol: 'cliente', correo }, process.env.API_KEY);
                    res.cookie('token', 'j:' + JSON.stringify({ token : token }));
                    console.log("cliente_id resgistrado " + cliente_id);
                    res.redirect('/');
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};



module.exports = regUserController;
  
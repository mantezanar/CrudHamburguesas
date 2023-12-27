const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = {};

controller.userLoginPage = (req, res) => {
    res.render('userLogin');
};

controller.userLoginTest = async (req, res) => {
    try {
        const { email, password: contrasenia } = req.body;
        req.getConnection((err, conn) => {
            const query = 'SELECT contrasenia, cliente_id, tipo_usuario FROM cliente WHERE correo = ?';
            conn.query(query, [email], async (err, rows) => {
                if (err) {
                    console.error(err);
                    return console.log(err);
                }
                console.log(rows);

                if (rows.length > 0) {
                    const storedHash = rows[0].contrasenia;
                    const tipoUsuario = rows[0].tipo_usuario;

                    try {
                        const result = await bcrypt.compare(contrasenia, storedHash);

                        if (result) {
                            console.log("Contraseña correcta");

                            const tokenData = {
                                id: rows[0].cliente_id,
                                rol: (tipoUsuario === 'cliente') ? 'cliente' : 'admin',
                                email
                            };

                            const token = jwt.sign(tokenData, process.env.API_KEY, { algorithm: 'HS256' });
                            res.cookie('token', 'j:' + JSON.stringify({ token }));
                            res.redirect('inicio');
                        } else {
                            console.log("Contraseña incorrecta");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    console.log("Usuario no encontrado");
                }
            });
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};


module.exports = controller;

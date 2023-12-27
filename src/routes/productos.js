const express = require('express');
const router = express.Router(); 
const { validateCreate } = require('../validator/validate')
const jwt = require('jsonwebtoken');
const productosCrontroller = require('../controllers/productosCrontroller');
const carritoController = require('../controllers/carritoController');
const agregarController = require('../controllers/agregarController');
const regUserController = require('../controllers/regUserController');
const testController = require('../controllers/testController');
const logUserController = require('../controllers/logUserController');

const verificarToken = (req, res, next) => {
    const token = req.cookies.token?.token; // Accede a req.cookies.token.token

    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso no autorizado - Token no proporcionado' });
    }
  
    try {
        console.log(token);
      const decoded = jwt.verify(token, process.env.API_KEY);
      
      if (decoded.rol.toLowerCase() !== 'admin') {
        return res.status(401).json({ mensaje: 'Acceso no autorizado - Rol no válido' });
      }

      // Si el token es válido y el rol es 'cliente', permitir el acceso
      next();
    } catch (error) {
      // Manejar errores
      let statusCode = 500;
      let mensajeError = 'Error al procesar el token';

      if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        mensajeError = 'Token inválido';
      }

      return res.status(statusCode).json({ mensaje: mensajeError });
    }
};
const verificarTokenCliente = (req, res, next) => {
    const token = req.cookies.token?.token; // Accede a req.cookies.token.token

    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso no autorizado - Token no proporcionado' });
    }
  
    try {
        console.log(token);
      const decoded = jwt.verify(token, process.env.API_KEY);
      
      if (decoded.rol.toLowerCase() !== 'cliente') {
        return res.status(401).json({ mensaje: 'Acceso no autorizado - Rol no válido' });
      }

      // Si el token es válido y el rol es 'cliente', permitir el acceso
      next();
    } catch (error) {
      // Manejar errores
      let statusCode = 500;
      let mensajeError = 'Error al procesar el token';

      if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        mensajeError = 'Token inválido';
      }

      return res.status(statusCode).json({ mensaje: mensajeError });
    }
};

router.post('/iniciarsesion', logUserController.userLoginTest);
router.get('/iniciosesion', logUserController.userLoginPage);

router.get('/registro', regUserController.userRegPage);
router.post('/registrar', regUserController.userReg);
router.post('/borrarcookie', regUserController.borrarCookie);

router.get('/carrito',verificarTokenCliente, carritoController.list);
router.get('/carritodelete/:id', carritoController.delete);

router.get('/agregar', agregarController.list);
router.post('/agregar', agregarController.save);
router.get('/test', testController.test);

router.get('/crud',verificarToken, productosCrontroller.list);
router.post('/add', validateCreate, productosCrontroller.save);
router.get('/update/:id', productosCrontroller.update);
router.post('/update/:id', validateCreate, productosCrontroller.save_update);
router.get('/delete/:id', productosCrontroller.delete);
router.get('/', productosCrontroller.listInicio);
router.get('**', productosCrontroller.listInicio);//esta redirige las rutas que no existen a la pagina principal
module.exports = router;
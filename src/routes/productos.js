const express = require('express');
const router = express.Router(); 
const { validateCreate } = require('../validator/validate')

const productosCrontroller = require('../controllers/productosCrontroller');
const carritoController = require('../controllers/carritoController');
const agregarController = require('../controllers/agregarController');
const regUserController = require('../controllers/regUserController');
const testController = require('../controllers/testController');
const logUserController = require('../controllers/logUserController');



router.post('/iniciarsesion', logUserController.userLoginTest);
router.get('/iniciosesion', logUserController.userLoginPage);

router.get('/registro', regUserController.userRegPage);
router.post('/registrar', regUserController.userReg);
router.post('/borrarcookie', regUserController.borrarCookie);

router.get('/carrito', carritoController.list);
router.get('/carritodelete/:id', carritoController.delete);

router.get('/agregar', agregarController.list);
router.post('/agregar', agregarController.save);
router.get('/test', testController.test);

router.get('/crud', productosCrontroller.list);
router.post('/add', validateCreate, productosCrontroller.save);
router.get('/update/:id', productosCrontroller.update);
router.post('/update/:id', validateCreate, productosCrontroller.save_update);
router.get('/delete/:id', productosCrontroller.delete);
router.get('/', productosCrontroller.listInicio);
router.get('**', productosCrontroller.listInicio);//esta redirige las rutas que no existen a la pagina principal
module.exports = router;
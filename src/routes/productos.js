const express = require('express');
const router = express.Router(); 
const { validateCreate } = require('../validator/validate')

const productosCrontroller = require('../controllers/productosCrontroller');
const carritoController = require('../controllers/carritoController');
const agregarController = require('../controllers/agregarController');


router.get('/', productosCrontroller.list);
router.post('/add', validateCreate, productosCrontroller.save);
router.get('/update/:id', productosCrontroller.update);
router.post('/update/:id', validateCreate, productosCrontroller.save_update);
router.get('/delete/:id', productosCrontroller.delete);

router.get('/inicio', productosCrontroller.listInicio);


router.get('/iniciosesion', productosCrontroller.userLogin);
router.get('/registro', productosCrontroller.userReg);

router.get('/carrito', carritoController.list);
router.get('/carritodelete/:id', carritoController.delete);

router.get('/agregar', agregarController.list);
router.post('/agregar', agregarController.save);


module.exports = router;
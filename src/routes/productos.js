const express = require('express');
const router = express.Router(); 

const productosCrontroller = require('../controllers/productosCrontroller');

router.get('/', productosCrontroller.list);
router.post('/add', productosCrontroller.save);
router.get('/update/:id', productosCrontroller.update);
router.post('/update/:id', productosCrontroller.save_update);
router.get('/delete/:id', productosCrontroller.delete);



module.exports = router;
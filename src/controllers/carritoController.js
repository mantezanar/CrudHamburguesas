const carritoController = {};
  
carritoController.list = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT id_producto FROM carrito', (err, productos_carrito) => {
            if (err) {
              res.json(err);
              return;
            }            
            const productos = [];
                  
            productos_carrito.forEach((productoCarrito) => {
              conn.query('SELECT * FROM productos WHERE id = ?', [productoCarrito.id_producto], (err, producto) => {
                if (err) {
                  res.json(err);
                  return;
                }
          
            
                productos.push(producto[0]);      

                if (productos.length === productos_carrito.length) {
                  res.render('carrito', {
                    data: productos
                  });
                }
              });
            });
          });
          
    });
};


carritoController.delete = (req, res) => {
    const { id } = req.params;
    console.log("aca",id)
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM carrito WHERE id_producto = ?', [id], (err, rows) =>{
            res.redirect('/carrito');
        });
    });
};





module.exports = carritoController;

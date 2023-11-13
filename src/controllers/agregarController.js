const agregarController = {};


agregarController.list = (req, res) =>{
    res.render('agregar'); 
      
};

agregarController.save = (req, res) => {
    const data = req.body;
    console.log(data);
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO carrito set ?', [data], (err, rows) =>{
            res.redirect("/agregar");
        });
    });
};

 

  module.exports = agregarController;
  
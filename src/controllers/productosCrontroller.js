const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, productos) => {
            if(err){
                res.json(err);
            }
            res.render('productos', {
                data: productos
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO productos set ?', [data], (err, rows) =>{
            console.log(rows);
            res.redirect("/");
        });
    });
};

controller.update = (req,res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE id = ?', [id], (err, productos) =>{
            res.render('productos_edit', {
                data: productos[0]
            });
        });
    });
}

controller.save_update = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE productos set ? WHERE id = ?', [newProduct, id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM productos WHERE id = ?', [id], (err, rows) =>{
            res.redirect('/');
        });
    });
};

controller.userLogin = (req, res) => {
    res.render('userLogin');
};
controller.userReg = (req, res) => {
    res.render('userReg');c
};
module.exports = controller;
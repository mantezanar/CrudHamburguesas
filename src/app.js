const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//import
const productosRoutes = require('./routes/productos');

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'crudnode'
}, 'single'));

app.use(express.urlencoded({extended: false}))

//rutas

app.use('/', productosRoutes);

//statics
app.use(express.static(path.join(__dirname, 'public')));

//inicio del sv
app.listen(3000, () => {
    console.log('Server on port 3000');
});
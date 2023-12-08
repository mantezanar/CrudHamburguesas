const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const mercadopago = require('mercadopago')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const client = new mercadopago.MercadoPagoConfig({ accessToken: 'TEST-93082596633294-110902-a71c669d973280fbaa9058c064f9966b-437294316' });






const app = express();

//import
const productosRoutes = require('./routes/productos');

//configuracion
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'crudnode'
}, 'single'));

app.use(express.urlencoded({extended: false}))

const preference = new mercadopago.Preference(client);

preference.create({
  'items': [
     {
	 'title': 'Meu produto',
	 'quantity': 1,
	 'currency_id': 'CLP',
	 'unit_price': 100
     }
  ]
}).then((result) => console.log(result))
	.catch((error) => console.log(error));

/*app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "http://localhost:3000/carrito",
            failure: "http://localhost:3000/carrito",
            pending: "",

        },
        auto_return: "approved",
    };

    mercadopago.preferences
    .create(preference)
    .then(function (response) {
        res.json({
            id: response.body.id,
        });
    })
    .catch(function(error) {
        console.log(error)
    });

});*/



//rutas / es importante que los estaticos se carguen antes de las rutas
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', productosRoutes);

//inicio del sv
app.listen(3000, () => {
    console.log('Server on port 3000');
});
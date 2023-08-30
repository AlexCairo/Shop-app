const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config({ path: 'variables.env'});
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3002';

//Conexión con la base de datos

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log('Ocurrió un error al conectarse con la base de datos',err));

app.use(express.json({limit:'20mb'}));
app.use(cors());
app.use(express.static('public'))

// Routes

const usuarioRutas = require('./routes/usuario.route');
const productoRutas = require('./routes/producto.route');
const categoriaRutas = require('./routes/categoria.route');
const pedidoRutas = require('./routes/pedido.route');
const auth = require('./middlewares/auth');

app.use('/api/usuarios',usuarioRutas);
app.use('/api/productos',productoRutas);
app.use('/api/pedidos',pedidoRutas);

app.use(auth);

app.use('/api/categorias',categoriaRutas);

app.listen(port, host, () => console.log("Servidor corriendo"));
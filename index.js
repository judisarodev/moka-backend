const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();
const routes = require('./routes/index');
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/say-hi', (req, res) => {
    res.send('Hola mundo'); 
});

app.use('/api', routes);

// Configura Express para manejar errores 404
app.use((req, res, next) => {
    const error = new Error(`404 - Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port); 
});
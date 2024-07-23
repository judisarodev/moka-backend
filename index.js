const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors'); 

app.use(cors());

app.get('/say-hi', (req, res) => {
    res.send('Hola mundo'); 
});

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port); 
});
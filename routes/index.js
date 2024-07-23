const express = require('express');
const router = express.Router();
const clientRoutes = require('./client/clientRoutes');

router.use('/client', clientRoutes);

module.exports = router; 
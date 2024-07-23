const express = require('express');
const router = express.Router();
const clientRoutes = require('./client/clientRoutes');
const path = require('path');

router.use('/client', clientRoutes);

module.exports = router; 
const express = require('express');
const router = express.Router();
const db =  require('./../database/db-controller');

router.get('/usuario', db.getUser);

router.get('/users', db.getUsers);

router.post('/addUser', db.addUser);

router.post('/addCita', db.addCita);

router.post('/removeCita', db.removeCita);

router.get('/citasByUser', db.getCitasByUser);

router.get('/citasByDate', db.getCitasByDate);

// Si no es una de las rutas anteriores, saco este mensaje
router.get('*', (req, res) => {
    res.end('Not found')
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

//registra
router.post('/registro', registroController.createRegistro);
//obtengo todos
router.get('/registro', registroController.getRegistros);
//obtener ID
router.get('/registro/:id', registroController.getRegistroById);
//actualizar
router.put('/registro/:id', registroController.updateRegistro);
//eliminar
router.delete('/registro/:id', registroController.deleteRegistro);
//PDF
router.get('/registro/descarga/pdf', registroController.descargarRegistrosPDF);


module.exports = router;
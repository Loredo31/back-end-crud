const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true }
});

module.exports = mongoose.model('registroModel', RegistroSchema);
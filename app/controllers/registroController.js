const Registro = require('../models/registroModel');
const PDFDocument = require('pdfkit');

//crear
exports.createRegistro = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;

        //tiene obligatorio
        if (!nombre || !apellido || !correo || !telefono) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        //no repite correo
        const correoExistente = await Registro.findOne({ correo });
        if (correoExistente) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const nuevoRegistro = new Registro({ nombre, apellido, correo, telefono });
        await nuevoRegistro.save();

        res.status(201).json({ message: "Registro creado exitosamente", registro: nuevoRegistro });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error });
    }
};

//obtengo los usuarios
exports.getRegistros = async (req, res) => {
    try {
        const registros = await Registro.find();
        res.json(registros);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros", error });
    }
};

//obtengo por ID
exports.getRegistroById = async (req, res) => {
    try {
        const registro = await Registro.findById(req.params.id);
        if (!registro) return res.status(404).json({ message: "Registro no encontrado" });
        res.json(registro);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro", error });
    }
};

//actualizo
exports.updateRegistro = async (req, res) => {
    try {
        const registroActualizado = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!registroActualizado) return res.status(404).json({ message: "Registro no encontrado" });

        res.json({ message: "Registro actualizado correctamente", registro: registroActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro", error });
    }
};

//elimino
exports.deleteRegistro = async (req, res) => {
    try {
        const registroEliminado = await Registro.findByIdAndDelete(req.params.id);
        if (!registroEliminado) return res.status(404).json({ message: "Registro no encontrado" });

        res.json({ message: "Registro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro", error });
    }
};

//PDF
exports.descargarRegistrosPDF = async (req, res) => {
    try {
        const registros = await Registro.find();

        const doc = new PDFDocument();

        //encabezado
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Registros.pdf');

        //envia PDF
        doc.pipe(res);

        //titulo
        doc.fontSize(18).text('Lista de Registros', { align: 'center' });
        doc.moveDown();

        //contenido
        registros.forEach((registro, i) => {
            doc
                .fontSize(12)
                .text(
                    `${i + 1}. Nombre: ${registro.nombre} ${registro.apellido} | Correo: ${registro.correo} | Teléfono: ${registro.telefono}`
                );
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el PDF', error });
    }
};
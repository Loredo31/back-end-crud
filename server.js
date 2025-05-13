require('dotenv').config(); 
express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const app = express();

const registroRoutes = require('./app/routes/registroRoutes');

// Conectar a la base de datos MongoDB
conectarDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '500mb' })); 
app.use('/api', registroRoutes);


// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
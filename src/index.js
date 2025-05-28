const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const statisticsRoutes = require('./routes/statistics');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Solo una vez basta

// Conexión a MongoDB sin opciones deprecated
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Conectado a MongoDB');
})
.catch((err) => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
});

// Rutas
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);  
app.use('/api/users', userRoutes);
app.use('/api/statistics', statisticsRoutes);


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

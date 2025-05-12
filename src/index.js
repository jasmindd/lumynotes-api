const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json());


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Conectado a MongoDB');
}).catch((err) => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
});

// Rutas
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);  
app.use('/api/users', userRoutes);


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
const express = require('express'); 
const authRoutes = require('./routes/auth');
const cafeRoutes = require('./routes/cafe');
const app = express()
app.use(express.json())

// Usar las rutas
app.use('/api', authRoutes); // Rutas de autenticación
app.use('/api', cafeRoutes); // Rutas de café

app.listen(5000, () => {
    console.log('El servidor se encuentra en el puerto 5000')
})


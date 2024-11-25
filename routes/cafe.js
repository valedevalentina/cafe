const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/ping', async (req, res) => {
    res.send('pong')
})

router.post('/cafe',  authMiddleware, async (req, res) => {
    try {
        const { cafes, mesa } = req.body

        //Obtenemos el token de los headers para obtener el ID del usuario logueado
        const token = req.headers.authorization?.split(' ')[1];
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Almacena solo el ID del usuario en req.userId
        const userId = decoded.id; // Aquí solo guardamos el ID
        const nombre = decoded.nombre
        // Crear la venta con sus cafes en una sola transacción
        const nuevaVenta = await prisma.venta.create({
            data: {
                nombre : nombre,
                mesa,
                userId : userId,
                cafes: {
                    create: cafes.map(item => ({
                        cafe: item.cafe,
                        precio: item.precio
                    }))
                }
            },
            // Incluir los detalles en la respuesta
            include: {
                cafes: true
            }
        })

        res.json({
            mensaje: 'Venta creada exitosamente',
            venta: nuevaVenta
        })

    } catch (error) {
        console.error('Error al crear la venta:', error)
        res.status(500).json({
            error: 'Error al procesar la venta'
        })
    }
})

module.exports = router;
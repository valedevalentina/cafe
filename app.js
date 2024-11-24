const express = require('express'); 
const app = express()
app.use(express.json())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cafes =[];

app.get('/cafe', async (req, res) => {
res.send('Todo ok')
})

app.post('/cafe', async (req, res) => {
    try {
        const { nombre, cafes, mesa } = req.body

        // Crear la venta con sus cafes en una sola transacción
        const nuevaVenta = await prisma.venta.create({
            data: {
                nombre,
                mesa,
                cafes: {
                    create: cafes.map(item => ({
                        cafe: item.cafe,
                        precio: item.precio
                    }))
                }
            },
            // Incluir los cafes en la respuesta
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

app.listen(5000, () => {
    console.log('El servidor se encuentra en el puerto 5000')
})


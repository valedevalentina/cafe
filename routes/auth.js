
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Endpoint de login
router.post('/login', async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        // Validar que se envíen los campos requeridos
        if (!email || !contrasena) {
            return res.status(400).json({
                error: 'Email y contraseña son requeridos'
            });
        }

        // Buscar el usuario
        const registro = await prisma.registro.findUnique({
            where: { email }
        });

        // Verificar si el usuario existe y la contraseña es correcta
        if (!registro || !(await bcrypt.compare(contrasena, registro.contrasena))) {
            return res.status(401).json({
                error: 'Credenciales inválidas'
            });
        }

        // Generar el token
        const token = jwt.sign(
            {
                id: registro.id,
                email: registro.email,
                nombre: registro.nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Responder con el token
        res.json({
            mensaje: 'Login exitoso',
            token,
            registro: {
                id: registro.id,
                email: registro.email,
                nombre: registro.nombre
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            error: 'Error al procesar el login'
        });
    }
});

// Endpoint de registro (opcional, pero útil para crear usuarios)
router.post('/registro', async (req, res) => {
    try {
        const { email, contrasena, nombre } = req.body;

        // Validar campos requeridos
        if (!email || !contrasena || !nombre) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const registroExistente = await prisma.registro.findUnique({
            where: { email }
        });

        if (registroExistente) {
            return res.status(400).json({
                error: 'El email ya está registrado'
            });
        }

        // Encriptar la contraseña
        const hashedContrasena = await bcrypt.hash(contrasena, 10);

        // Crear el usuario
        const registro = await prisma.registro.create({
            data: {
                email,
                contrasena: hashedContrasena,
                nombre
            }
        });

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: {
                id: registro.id,
                email: registro.email,
                nombre: registro.nombre
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            error: 'Error al procesar el registro'
        });
    }
});

module.exports = router;
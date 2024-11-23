const express = require('express'); 
const app = express()
app.use(express.json())

const cafes =[];

app.get('/cafe', async (req, res) => {
res.send('Todo ok')
})

app.post('/cafe', async (req, res) => {
    const {nombre, cafe, precio} = req.body
    console.log(req.body)

    res.send('metodo post funciona')
})

app.listen(5000, () => {
    console.log('El servidor se encuentra en el puerto 5000')
})


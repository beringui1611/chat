const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')


const app = express()
const server = createServer(app)
const io = new Server(server)

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index.ejs')
})

io.on('connection', (socket) => {

    const dataNow = new Date()
    dataNow.getHours()
    socket.on('disconnect', () => {
    console.log('usuario desconectou' + socket.id + " " + dataNow )
})

    socket.on("msg", (data) => {
        io.emit('showmsg',data)
    console.log(data)
})
    
})


server.listen(4050, () => {
    console.log('server on 🚀')
})
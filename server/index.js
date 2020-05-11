const express = require('express');
const http = require('http')
const router = require("./router")
const socketio = require('socket.io')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')

const app = express()

app.use(router)

const server = http.createServer(app)

server.listen(process.env.PORT || 5000, () => console.log('start has started'))

const io = socketio(server)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)
    console.log(`${user.name} has joined the ${user.room}`)

    socket.emit('message', { user: 'admin', message: `${user.name} has entered the ${room}` })
    socket.broadcast.to(user.room).emit('message', { user: 'admin', message: `${user.name} has joined` })

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    console.log(user)
    io.to(user.room).emit('message', { user: user.name, message: message })
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    console.log(`${user.name} has disconnected`)

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', message: `${user.name} has left` })
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    }
  })

})
const express = require('express')
const app = express();
var cors = require('cors')
var fs = require('fs');
// const server = require('http').Server(app)
var privateKey = fs.readFileSync('/etc/letsencrypt/live/activeknocker.codonnier.tech/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/activeknocker.codonnier.tech/fullchain.pem');
var options = { key: privateKey, cert: certificate };
const server = require('https').Server(options, app)
app.use(cors())
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', socket => {
    console.log('Socket New Connection : ' + socket.id);
    socket.on('join-room', (roomId, userId, name) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId, name)
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
    })
    socket.on('send-chat-message', (room, message, name) => {
        socket.broadcast.to(room).emit('chat-message', { message: message, name: name })
    })
    socket.on('share', (userId, roomId) => {
        socket.to(roomId).emit('startScreen', userId)
    })
    socket.on('stopscreenshare', (userId, roomId) => {
        socket.to(roomId).emit('stopScreen', userId)
    })

    socket.on('test', (userId, roomId,name) => {
        socket.to(roomId).emit('testname', userId,name)
    })
})
server.listen(3030)
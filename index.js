const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/App.vue')
});

const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});
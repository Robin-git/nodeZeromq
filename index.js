const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    engines = require('consolidate'),
    io = require('socket.io')(http)

app.use('/public', express.static('public'))
app.use('/pixi', express.static(__dirname + '/node_modules/pixi.js/dist/'))
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'))

app.engine('html', engines.mustache)

app.set('view engine', 'html')
app.set('views', __dirname + '/public/html')

app.get('/', function (req, res) {
    res.render('index')
})

io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

http.listen(8000, function () {
    console.log('listening on *:8000');
})
const express = require('express'),
    app = express(),
    path = require('path'),
    engines = require('consolidate')

app.use('/public', express.static('public'))
app.use('/pixi', express.static(__dirname + '/node_modules/pixi.js/dist/'))

app.engine('html', engines.mustache);

app.set('view engine', 'html');
app.set('views', __dirname + '/public/html')

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
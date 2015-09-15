var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Manager = require('./server/manager');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var manager = new Manager();

io.on('connection', manager.onConnection);

server.listen(8080);
console.log('listen on port 8080');

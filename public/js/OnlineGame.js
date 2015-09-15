var Pong = Pong || {};

Pong.OnlineGame = function() {

}

Pong.OnlineGame.prototype.preload = function() {

  //create the conenection with the server
  //we disable the reconnection for test purposes
  this.socket = io('http://localhost:8080', {reconnection: false});

  this.socket.on('welcome', function(data){
    console.log(data.msg)
  });

  this.socket.on('start', function(data){
    console.log(data.msg);
  });

}

Pong.OnlineGame.prototype.update = function() {

}

Pong.OnlineGame.prototype.create = function() {

}

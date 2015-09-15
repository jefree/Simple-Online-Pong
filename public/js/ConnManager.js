function ConnManager(game) {
  var socket = null;

  function connect() {

    socket = io('http://localhost:8080', {reconnection: false});

    socket.on('welcome', function(data){
      game.player = game.players[data.freeSlot];
      game.player.alpha = 1.0;
    });

    socket.on('player', function(data) {
      
    });

    socket.on('start', function(data){
      console.log(data.msg);
    });
  }

  /**
   * Export public variables and methods
   */
  this.connect = connect;
}

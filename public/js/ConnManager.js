function ConnManager(game) {
  var socket = null;

  function connect() {

    socket = io('http://localhost:8080', {reconnection: false});

    socket.on('welcome', function(gameState){
      //set the player that this user will control
      game.player = game.players[gameState.slot];

      //update all players
      gameState.players.forEach(function(playerData){
        //update the info for the player if connected
        var player = game.players[playerData.slot];
        player.alpha = 1.0;
        player.setData(playerData);
      });

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

function ConnManager(game) {
  var socket = null;

  function connect() {

    socket = io('http://localhost:8080', {reconnection: false});

    socket.on('welcome', function(gameState){
      console.log('now im connected')

      //set the player that this user will control
      game.player = game.players[gameState.slot];
      game.player.socket = socket;

      //update all players
      applyUpdate(gameState);

    });

    socket.on('player', function(playerData) {
      console.log('new player')

      //active the player for the new user
      var player = game.players[playerData.slot];
      player.setData(playerData);
      player.alpha = 1.0;
    });

    socket.on('start', function(data){
      console.log(data.msg);
    });

    socket.on('update', function(gameState) {
      applyUpdate(gameState);
    });
  }

  function applyUpdate(gameState){
    gameState.players.forEach(function(playerData){
      //update the info for the player if connected
      var player = game.players[playerData.slot];
      player.alpha = 1.0;
      player.setData(playerData);
    });
  }

  /**
   * Export public variables and methods
   */
  this.connect = connect;
}

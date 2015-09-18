function ConnManager(game) {
  var socket = null;

  function connect() {

    socket = io('http://localhost:8080', {reconnection: false});

    socket.on('welcome', function(gameState){
      console.log('now im connected')

      //set the player that this user will control
      game.player = game.players[gameState.slot];
      game.player.socket = socket;

      game.clientTime = gameState.gameTime;

      //update all players
      game.init();
      game.applyUpdate(gameState);

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
      game.applyUpdate(gameState);
    });
  }

  /**
   * Export public variables and methods
   */
  this.connect = connect;
}

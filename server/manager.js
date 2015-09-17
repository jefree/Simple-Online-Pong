var Game = require('./game');

/**
 * A manager is responsible for the management for the games 
 * in the server, add new players to a game and delete a game that
 * has ended.
 *  
 */
function Manager() {

  var games = [];

  function onConnection(socket) {

    var game = getFreeGame();
    game.addPlayer(socket);

    if (game.isFull()) {
      game.start();
    }

  }

  /**
   * return a standby game in the game list or create a new one
   */

  function getFreeGame() {
    var game = null;

    for (var i=0; i<games.length; i++) {
      var g = games[i];

      if (!g.isFull()) {
        game = g;
        break;
      }
    };

    //free game didnt found, create new one
    if (!game) {
      game = new Game();
      game.init();
      games.push(game);
    }


    return game;
  }

  /**
   * export public variables and methods
   */
  this.onConnection = onConnection;
}

module.exports = Manager;

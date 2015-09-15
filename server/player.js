/**
 * Player object constructor
 */
function Player(data, socket, game) {
  console.log('new player', data);

  var x = data.x;
  var y = data.y;
  var width = data.width;
  var height = data.height;

  /**
   * export public vars and methods
   */
  this.socket = socket;

}

module.exports = Player;

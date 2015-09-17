/**
 * Player object constructor
 */
function Player(data, socket, game) {
  console.log('new player', data);

  var x = data.x;
  var y = data.y;
  var width = data.width;
  var height = data.height;

  function getData(){
    return {
      x: x,
      y: y,
      w: width,
      h: height,
      c: socket != null 
    };
  }

  /**
   * export public vars and methods
   */
  Object.defineProperty(this, 'socket', {
    get: function() { return socket; },
    set: function(s) { socket = s; }
   });

  Object.defineProperty(this, 'x', {
    get: function() { return x; },
    set: function(newX) { x = newX; }
   });

  Object.defineProperty(this, 'y', {
    get: function() { return y; },
    set: function(newY) { y = newY; }
   });
  
  this.getData = getData;

}

module.exports = Player;

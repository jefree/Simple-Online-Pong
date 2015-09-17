/**
 * Player object constructor
 */
function Player(data, socket, game) {
  console.log('new player', data);

  var x = data.x;
  var y = data.y;
  var width = data.width;
  var height = data.height;

  var vx = 0;
  var vy = 0;

  function update() {
    x += vx;
    y += vy;
  }

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

   Object.defineProperty(this, 'vx', {
    get: function() { return vx; },
    set: function(newVx) { vx = newVx; }
   });

  Object.defineProperty(this, 'vy', {
    get: function() { return vy; },
    set: function(newVy) { vy = newVy; }
   });
  
  this.update = update;
  this.getData = getData;

}

module.exports = Player;

/**
 * 
 */
function Ball(game, data) {

  var x = data.x;
  var y = data.y;
  var width = data.w;
  var height = data.h;
  
  var vx = 40;
  var vy = 0;

  function getData() {
    return {
      x: x,
      y: y,
      w: width,
      h: height
    }
  }

  function move(delta) {
    x += vx*delta;
    y += vy*delta;
  }

  Object.defineProperty(this, 'x', {
    get: function() { return x; },
    set: function(newX) { x = newX; }
  });

  Object.defineProperty(this, 'y', {
    get: function() { return y; },
    set: function(newY) { y = newY; }
  });

  this.move = move;
  this.getData = getData;

}

module.exports = Ball;
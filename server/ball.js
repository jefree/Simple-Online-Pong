/**
 * 
 */
function Ball(game, data) {

  var x = data.x;
  var y = data.y;
  var width = data.w;
  var height = data.h;
  var radius = data.r;
  
  var vx = 0;
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

  Object.defineProperty(this, 'width', {
    get: function() { return width; },
    set: function(newWidth) { width = newWidth; }
  });

  Object.defineProperty(this, 'height', {
    get: function() { return height; },
    set: function(newHeight) { height = newHeight; }
  });

  Object.defineProperty(this, 'r', {
    get: function() { return radius; },
    set: function(newRadius) { radius = newRadius; }
  });

  Object.defineProperty(this, 'vx', {
    get: function() { return vx; },
    set: function(newVx) { vx = newVx; }
  });

  Object.defineProperty(this, 'vy', {
    get: function() { return vy; },
    set: function(newVy) { vy = newVy; }
  });

  this.move = move;
  this.getData = getData;

}

module.exports = Ball;
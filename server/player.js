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
  var vy = 100;

  var lastInput = -1;
  var inputs = [];

  function update(delta) {
    x += vx * delta;
    y += vy * delta;
  }

  function getData(){
    return {
      x: x,
      y: y,
      w: width,
      h: height,
      c: socket != null,
      lastInput: lastInput
    };
  }

  function applyInputs(delta) {
    if (inputs.length == 0){
      return;
    }

    var dir = {x: 0, y: 0};

    inputs.forEach(function(input) {
      if (input.key == 'UP'){
        dir.y -= 1;
      }
      else if (input.key == 'DOWN'){
        dir.y += 1;
      }
    });

    x += dir.x * vx * delta;
    y += dir.y * vy * delta;

    lastInput = inputs[inputs.length-1].id;
    inputs = [];
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

  Object.defineProperty(this, 'lastInput', {
    get: function() { return lastInput; },
    set: function(newInput) { lastInput = newInput; }
  });

  Object.defineProperty(this, 'inputs', {
    get: function() { return inputs; },
    set: function(newInputs) { inputs = newInputs; }
  });

  this.update = update;
  this.getData = getData;
  this.applyInputs = applyInputs;

}

module.exports = Player;

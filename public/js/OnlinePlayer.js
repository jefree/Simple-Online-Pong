Pong.Player = function(game, data, id) {
  Phaser.Sprite.call(this, game, data.x, data.y, 'paddle');
  game.add.existing(this);

  this.width = data.w;
  this.height = data.h;

  this.vx = 0;
  this.vy = 100;

  this.lastInput = -1;
  this.inputs = [];
}

Pong.Player.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Player.prototype.constructor = Pong.Player;

Pong.Player.prototype.setData = function(data){
  this.x = data.x;
  this.y = data.y;
  this.w = data.w;
  this.h = data.h;
}

Pong.Player.prototype.applyInputs = function(delta, inputs) {
  inputs = inputs || this.inputs;

  if (inputs.length == 0) {
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

  this.x += dir.x * this.vx * delta;
  this.y += dir.y * this.vy * delta;

  if(this.inputs.length > 0){ 
    this.inputs = [];
  }
}

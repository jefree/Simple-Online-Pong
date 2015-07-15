var Pong = Pong || {};

Pong.Ball = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  game.add.existing(this);

  this.speed = {
    x: 0,
    y:0
  };
}

Pong.Ball.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Ball.prototype.constructor = Pong.Ball;

Pong.Ball.prototype.update = function() {
  
  var delta = this.game.time.physicsElapsed;

  this.x += this.speed.x * delta;
  this.y += this.speed.y * delta;
}
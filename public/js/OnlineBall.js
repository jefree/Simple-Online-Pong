var Pong = Pong || {};

Pong.Ball = function(game, data) {
  Phaser.Sprite.call(this, game, data.x, data.y, 'ball');
  game.add.existing(this);
  
  this.width = data.w;
  this.height = data.h;
}

Pong.Ball.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Ball.prototype.constructor = Pong.Ball;

Pong.Ball.prototype.lerp = function(target, delta) {
  this.x = this.x + delta * (target.x - this.x);
  this.y = this.y + delta * (target.y - this.y);
}
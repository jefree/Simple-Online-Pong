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

  var delta = this.game.time.elapsed;
  var body = Pong.Utils.createBody(this);

  if (body.bottom >= this.game.height) {
    this.speed.y *= -1;
    this.y = this.game.height - this.height;
  }

  if (body.top <= 0) {
    this.speed.y *= -1;
    this.y = 0;
  }

  this.x += this.speed.x * delta / 1000;
  this.y += this.speed.y * delta / 1000;
}
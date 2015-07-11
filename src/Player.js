var Pong = Pong || {};

Pong.Player = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  game.add.existing(this);
}

Pong.Player.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Player.prototype.constructor = Pong.Player;

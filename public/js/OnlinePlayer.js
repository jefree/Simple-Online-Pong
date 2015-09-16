Pong.Player = function(game, data, id) {
  Phaser.Sprite.call(this, game, data.x, data.y, 'paddle');
  game.add.existing(this);

  this.width = data.w;
  this.height = data.h;
}

Pong.Player.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Player.prototype.constructor = Pong.Player;

Pong.Player.prototype.setData = function(data){
  this.x = data.x;
  this.y = data.y;
  this.w = data.w;
  this.h = data.h;
}

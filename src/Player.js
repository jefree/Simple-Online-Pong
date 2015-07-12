var Pong = Pong || {};

Pong.Player = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  game.add.existing(this);

  this.mode = 'VERTICAL';
  this.actions = {};
  this.spedd = 0;

}

Pong.Player.MODES = ['VERTICAL', 'HORIZONTAL'];

Pong.Player.prototype = Object.create(Phaser.Sprite.prototype);
Pong.Player.prototype.constructor = Pong.Player;

Pong.Player.prototype.update = function() {

  if (this.mode == 'VERTICAL') {
    this._processMovemet('y', this.height, this.game.height);
  }

  else if (this.mode == 'HORIZONTAL') {
    this._processMovemet('x', this.width, this.game.width);
  }
}

Pong.Player.prototype.setMode = function(mode, fk, bk) {

  if (Pong.Player.MODES.indexOf(mode) == -1){
    mode = 'VERTICAL';
  }

  this.mode = mode;
  this.forwardKey = fk; 
  this.backwardKey = bk;
}

Pong.Player.prototype._processMovemet = function(axis, size, limit) {

  var speed = this.speed * this.game.time.elapsed / 1000 ;
  
  if (this.game.input.keyboard.isDown(this.forwardKey)) {
    this[axis] -= speed;
  }

  if (this.game.input.keyboard.isDown(this.backwardKey)) {
    this[axis] += speed;
  }

  this[axis] = this[axis] < 0 ? 0 : this[axis];
  this[axis] = this[axis] + size > limit ? limit - size : this[axis];

}
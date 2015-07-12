var Pong = Pong || {};

Pong.Game = function() {

}

Pong.Game.prototype.preload =  function() {
  this.load.image('paddle', 'src/assets/images/paddle.png');
}

Pong.Game.prototype.create = function() {
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  this.player1 = new Pong.Player(this.game, 0, 0, 'paddle');
  this.player2 = new Pong.Player(this.game, 0, 0, 'paddle');

  this.player1.y = Pong.Utils.center(this.game.height, this.player1.height);

  this.player2.x = this.game.width - this.player2.width;
  this.player2.y = Pong.Utils.center(this.game.height, this.player1.height);

}

Pong.Game.prototype.update = function() {
  var isDown = this.input.keyboard.isDown;
  var velocity = 300 * this.game.time.elapsed / 1000;

  if (this.input.keyboard.isDown(Phaser.Keyboard.W)) {
    this.player1.y -= velocity;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
    this.player1.y += velocity;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
    this.player2.y -= velocity;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    this.player2.y += velocity;
  }

}

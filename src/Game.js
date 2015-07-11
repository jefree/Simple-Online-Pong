var Pong = Pong || {};

Pong.Game = function() {

}

Pong.Game.prototype.preload =  function() {
  console.log('preload');
  this.load.image('paddle', 'src/assets/images/paddle.png');
}

Pong.Game.prototype.create = function() {
  console.log('create');

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  this.player = new Pong.Player(this.game, 0, 0, 'paddle');

}

Pong.Game.prototype.update = function() {
  var isDown = this.input.keyboard.isDown;
  var velocity = 300 * this.game.time.elapsed / 1000;

  if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
    this.player.y -= velocity;
  }

  if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    this.player.y += velocity;
  }
}

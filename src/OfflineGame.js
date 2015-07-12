var Pong = Pong || {};

Pong.Game = function() {

}

Pong.Game.prototype.preload =  function() {
  this.load.image('paddle', 'src/assets/images/paddle.png');
  this.load.image('ball', 'src/assets/images/ball.png');
}

Pong.Game.prototype.create = function() {

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  //create players

  this.player1 = new Pong.Player(this.game, 0, 0, 'paddle');
  this.player2 = new Pong.Player(this.game, 0, 0, 'paddle');

  this.player1.y = Pong.Utils.center(this.game.height, this.player1.height);

  this.player2.x = this.game.width - this.player2.width;
  this.player2.y = Pong.Utils.center(this.game.height, this.player1.height);

  this.player1.speed = this.player2.speed = 250;

  this.player1.setMode('VERTICAL', Phaser.Keyboard.W, Phaser.Keyboard.S);
  this.player2.setMode('VERTICAL', Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);

  // create ball

  this.ball = new Pong.Ball(this.game, 0, 0, 'ball');
  this.ball.speed.x = 100;
  this.ball.speed.y = 100;
  this.ball.x = Pong.Utils.center(this.game.width, this.ball.width);
  this.ball.y = Pong.Utils.center(this.game.height, this.ball.height);
}

Pong.Game.prototype.update = function() {

  if (Pong.Utils.intersect(this.player1, this.ball) ||
      Pong.Utils.intersect(this.player2, this.ball)) 
  {

    //console.log('heeeee')

    this.ball.speed.x *= -1;
    this.ball.speed.y *= -1;

  }

} 

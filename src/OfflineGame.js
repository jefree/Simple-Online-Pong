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

  this.game.stage.backgroundColor = '#0000FF';

  //create players

  this.player1 = new Pong.Player(this.game, 0, 0, 'paddle');
  this.player2 = new Pong.Player(this.game, 0, 0, 'paddle');

  this.player1.y = Pong.Utils.center(this.game.height, this.player1.height);

  this.player2.x = this.game.width - this.player2.width;
  this.player2.y = Pong.Utils.center(this.game.height, this.player1.height);

  this.player1.speed = this.player2.speed = 250;

  this.player1.setMode('VERTICAL', Phaser.Keyboard.W, Phaser.Keyboard.S);
  this.player2.setMode('VERTICAL', Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);

  this.initTimerText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '3', {fontSize: '25pt'});
  this.initTimerText.anchor.set(0.5, 0.5);

  var times = 3;
  this.playing = false;

  this.initTimer = this.game.time.create(true);
  this.initTimer.repeat(1000, times, function(arg){
    times -= 1;
    
    this.initTimerText.text = times+'';

    if (times == 0) {

      // create ball
      
      this.ball = new Pong.Ball(this.game, 0, 0, 'ball');
      this.ball.speed.x = Math.random() < 0.5 ? 250 : -250;
      this.ball.speed.y = Math.random() < 0.5 ? 250 : -250;
      this.ball.x = Pong.Utils.center(this.game.width, this.ball.width);
      this.ball.y = Pong.Utils.center(this.game.height, this.ball.height);

      this.initTimerText.destroy(true);

      this.playing = true;
    }
  }, this);

  this.initTimer.start();
}

Pong.Game.prototype.update = function() {

  if (!this.playing) return;

  var ballBody = Pong.Utils.createBody(this.ball);

  if (ballBody.bottom >= this.game.height) {
    this.ball.speed.y *= -1;
  }

  if (ballBody.top <= 0) {
    this.ball.speed.y *= -1;
  }

  if (Pong.Utils.intersect(this.ball, this.player1) ||
      Pong.Utils.intersect(this.ball, this.player2)) 
  {
    this.ball.speed.x *= -1;
  }

} 

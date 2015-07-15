var Pong = Pong || {};

Pong.Game = function() {

}

Pong.Game.prototype.preload =  function() {
  this.load.image('paddle', 'src/assets/images/paddle.png');
  this.load.image('ball', 'src/assets/images/ball.png');

  this.game.time.advancedTiming = true;
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

  this.player1Score = this.game.add.text(15,15, '0');
  this.player2Score = this.game.add.text(this.game.width-30, 15, '0');

  this.player1.score = 0;
  this.player2.score = 0;

  this.beginGame();
}

Pong.Game.prototype.update = function() {

  if (!this.playing) return;

  var ballBody = Pong.Utils.createBody(this.ball);

  var amount = this.game.time.physicsElapsed * 5;

  if (Math.abs(this.ball.speed.x) < 500) { 
    this.ball.speed.x += this.ball.speed.x > 0 ? amount : - amount;
    this.ball.speed.y += this.ball.speed.y > 0 ? amount : - amount;
  }

  if (ballBody.bottom >= this.game.height) {
    this.ball.speed.y *= -1;
  }

  if (ballBody.top <= 0) {
    this.ball.speed.y *= -1;
  }

  if (ballBody.left < this.player1.width/2) {
    this.player2.score += 1;
    this.player2Score.text = this.player2.score+'';
    this.putBall();
    this.ball.speed.x = Math.abs(this.ball.speed.x);
  }
  else if (ballBody.right > this.game.width - this.player2.width/2) {
    this.player1.score += 1;
    this.player1Score.text = this.player2.score+'';
    this.putBall();
    this.ball.speed.x = - Math.abs(this.ball.speed.x);
  }

  if (Pong.Utils.intersect(this.ball, this.player1) ||
      Pong.Utils.intersect(this.ball, this.player2)) 
  {
    this.ball.speed.x *= -1;
  }
}

Pong.Game.prototype.render = function() {
  this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00FF00");
}

Pong.Game.prototype.beginGame = function() {
  var times = 3;
  this.playing = false;

  this.initTimerText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '3', {fontSize: '25pt'});
  this.initTimerText.anchor.set(0.5, 0.5);

  this.initTimer = this.game.time.create(true);
  this.initTimer.repeat(1000, times, function(arg){
    times -= 1;
    
    this.initTimerText.text = times+'';

    if (times == 0) {

      // create ball
      
      this.ball = new Pong.Ball(this.game, 0, 0, 'ball');
      this.putBall();

      this.initTimerText.destroy(true);

      this.playing = true;
    }
  }, this);

  this.initTimer.start();
}

Pong.Game.prototype.putBall = function() {
  this.ball.speed.x = Math.random() < 0.5 ? 250 : -250;
  this.ball.speed.y = Math.random() < 0.5 ? 250 : -250;
  this.ball.x = Pong.Utils.center(this.game.width, this.ball.width);
  this.ball.y = Pong.Utils.center(this.game.height, this.ball.height);
}



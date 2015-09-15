var Pong = Pong || {};

Pong.OnlineGame = function() {

  /**
   * Static values for the game. the same as in the server.
   */
  var GAME_WIDHT = 640;
  var GAME_HEIGHT = 480;

  var PLAYER_DATA = [
    {x: 0, y: 0, w: 30, h: 100},
    {x: GAME_WIDHT-30, y: GAME_HEIGHT-100, w: 30, h: 100}
  ];


  /**
   * export public variables
   */
   this.PLAYER_DATA = PLAYER_DATA;
}

//same as in the server side 
Pong.OnlineGame.prototype.preload = function() {
  this.load.image('paddle', '/img/paddle.png');
  this.load.image('ball', '/img/ball.png');

  this.game.time.advancedTiming = true;
}

Pong.OnlineGame.prototype.create = function() {
  var self = this;

  //set the background color por the game
  this.game.stage.backgroundColor = '#0000FF';

  /* Create the players for the game */
  self.players = [];

  self.PLAYER_DATA
  .forEach(function(data, index){
    //create one player for each player slot
    self.players.push(new Pong.Player(self.game, data, index));
  });
}

Pong.OnlineGame.prototype.update = function() {

}

Pong.OnlineGame.prototype.render = function() {
  //show current fps
  this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00FF00");
}

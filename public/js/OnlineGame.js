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
  this.STEP_TIME = 0.022; //update physics each 22ms
  this.INTERP_TIME = 0.09; //interpolate other entities from 100ms in the past
  this.UPDATES_LIMIT = 10; //just have the last updates
  
  this.PLAYER_DATA = PLAYER_DATA;
   
  this.KEY_UP = Phaser.Keyboard.UP;
  this.KEY_DOWN = Phaser.Keyboard.DOWN;

  this.connManager = new ConnManager(this);  //manager for the connection with the server
  this.player = null;  //player controlled the user
  this.players = []; //players in game
  this.clientTime = -1;
  this.lastTime = -1;

  this.rInputs = [];
  this.inputCounter = -1;

  this.gameUpdates = [];
}

Pong.OnlineGame.prototype._init = function(){
  setInterval(this.physicsLoop.bind(this), this.STEP_TIME*1000);
}

Pong.OnlineGame.prototype.physicsLoop = function(){

  /*if (this.lastTime == -1) {
    this.lastTime = Date.now();
    return;
  }

  var delta = (Date.now() - this.lastTime) / 1000;
  this.lastTime = Date.now();*/

  var delta = this.STEP_TIME;
  this.clientTime += delta;

  this.player.applyInputs(delta);
  this.interpolatePlayers();
}

Pong.OnlineGame.prototype.applyCorrection = function(){

  var totalToRemove = 0;
  for (var i=0; i<this.rInputs.length; i++){
    if (this.rInputs[i].id <= this.player.lastInput) {
      totalToRemove++;
    }
    else {
      break;
    }
  }

  this.rInputs.splice(0, totalToRemove);
  console.log('restantes', this.rInputs.length);

  if (this.rInputs.length > 0) {
    this.player.applyInputs(this.STEP_TIME, this.rInputs);
  }
}

Pong.OnlineGame.prototype.applyUpdate = function(gameState){

  this.gameUpdates.push(gameState);


  if (this.gameUpdates.length > this.UPDATES_LIMIT) {
    this.gameUpdates.splice(0, 1);
  }

  this.serverTime = gameState.gameTime;
  this.clientTime = this.serverTime;

  console.log('------');
  console.log('original', this.player.y);

  gameState.players.forEach(function(playerData){
    //update the info for the player if connected
    var player = this.players[playerData.slot];
    player.alpha = 1.0;
    
    if (player == this.player){
      player.setData(playerData);
      this.player.lastInput = playerData.lastInput;
      console.log('last input', this.player.lastInput);
    }

  }.bind(this));

  console.log('server', this.player.y); 
  this.applyCorrection();
  console.log('corregida', this.player.y);
}

Pong.OnlineGame.prototype.interpolatePlayers = function(){
  var pastTime = this.clientTime - this.INTERP_TIME;

  var previous = null;
  var target = null;

  for (var i=0; i<this.gameUpdates.length-1; i++){
    var previous_state = this.gameUpdates[i];
    var next_state = this.gameUpdates[i+1];

    if (previous_state.gameTime > pastTime && pastTime < next_state.gameTime){
      previous = previous_state;
      target = next_state;
      break;
    }
  }

  if (previous && target) {

    for (var i=0; i<target.players.length; i++) {
      var targetPlayer = target.players[i];
      var player = this.players[i];

      //just make interp for other players
      if (player != this.player) {
        console.log('total time', target.gameTime-pastTime);
        console.log('delta interp', this.STEP_TIME/(target.gameTime-pastTime))
        player.lerp(targetPlayer, this.STEP_TIME/(target.gameTime-pastTime));
      }
    }
  }

}

Pong.OnlineGame.prototype.create = function() {

  //set the background color por the game
  this.game.stage.backgroundColor = '#0000FF';

  /* Create the players for the game */
  this.players = [];

  this.PLAYER_DATA
  .forEach(function(data, index){
    //create one player for each player slot
    var player = new Pong.Player(this.game, data, index);
    player.alpha = 0.5; //all players are disable until the server assign a slot to it 
    this.players.push(player);
  }.bind(this));

  this.connManager.connect();
}

Pong.OnlineGame.prototype.update = function() {

  var keyUp = this.game.input.keyboard.isDown(this.KEY_UP);
  var keyDown = this.game.input.keyboard.isDown(this.KEY_DOWN);

  var input = null;

  if (keyUp) {
    input = {id: ++this.inputCounter, key: 'UP'}
  }
  else if (keyDown) {
    input = {id: ++this.inputCounter, key: 'DOWN'};
  }

  if (input) {
    this.player.socket.emit('input', input);
    this.player.inputs.push(input);
    this.rInputs.push(input);
  }
}

Pong.OnlineGame.prototype.preload = function() {
  this.load.image('paddle', '/img/paddle.png');
  this.load.image('ball', '/img/ball.png');

  this.game.time.advancedTiming = true;
}

Pong.OnlineGame.prototype.render = function() {
  //show current fps
  this.game.debug.text(this.game.time.fps || '--', 2, 14, "#FF0000");
  this.game.debug.text(this.serverTime && this.serverTime.toFixed(2) || '--', 500, 14, "#00FF00");
  this.game.debug.text(this.clientTime && this.clientTime.toFixed(2) || '--', 500, 30, "#FFF");
}

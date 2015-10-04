var Player = require('./player')
var Ball = require('./ball')
var ServerConManager = require('./serverConManager')
var physics = require('./physics');

/**
 * Game constants
 */
var GAME_WIDHT = 640;
var GAME_HEIGHT = 480;
var STEP_TIME = 0.022;

/*
 * Data for each available player slot into the game. 
 */
var PLAYER_DATA = [
  {x: 0, y: 0, w: 30, h: 100},
  {x: GAME_WIDHT-30, y: GAME_HEIGHT-100, w: 30, h: 100}
];

var BALL_DATA = { x: 310, y: 230, w: 20, h: 20 };

var idCounter = 0;

/**
 * Game object constructor
 */
function Game() {
  console.log('new game ', idCounter);

  var id = idCounter++;
  var started = false;
  var gameTime = 0;
  var lastTime = -1;
  var players = [];
  var connManager = new ServerConManager(this);

  var fakeLag = 60;

  PLAYER_DATA.forEach(function(data){
    players.push(new Player(data, null, this));
  }.bind(this));

  var ball = new Ball(this, BALL_DATA);

  /**
   * Create the loops for this game
   */
  function init() {
    setInterval(physicsLoop, STEP_TIME*1000); //update world every 22ms ~ 45fps
    setInterval(updateLoop, 45);  //send updates to clients every 45ms
  }

  /**
   * The update loop. Send current game state to all players
   */
  function updateLoop() {

    if (fakeLag > 0) {
      setTimeout(sendUpdate.bind(null), fakeLag/2);
    }
    else {
      sendUpdate();
    }
  }

  /**
   * Physics loop. update the position for each player according
   * to its current velocity. increase game time.
   */
  function physicsLoop() {
    if (lastTime == -1) {
      lastTime = Date.now();
      return;
    }

    /*var delta = (Date.now() - lastTime) / 1000;
    lastTime = Date.now();*/

    var delta = STEP_TIME;
    gameTime += delta;

    /**
     * update position of entities
     */

    players.forEach(function(player){
      if (player.socket != null){
        player.applyInputs(delta);
      }
    });

    if (started) {

      ball.move(delta);

      if (physics.intersect(ball, players[0]) ||
          physics.intersect(ball, players[1]))
      {
        ball.vx = -ball.vx;
      }

      if (ball.y < 0){
        ball.y = 0;
        ball.vy = -ball.vy;
      }
      else if (ball.y+ball.height > GAME_HEIGHT) {
        ball.y = GAME_HEIGHT - ball.height;
        ball.vy = -ball.vy; 
      }

    }
  }

  /**
   * put the players in theirs inital position to
   * start a new game
   */
  function putPlayers() {
    players.forEach(function(player, index) {
      player.x = PLAYER_DATA[index].x;
      player.y = PLAYER_DATA[index].y;
    });
  }

  /**
   * put the ball on its inital position to start
   * a new round
   */
  function putBall() {
    ball.x = BALL_DATA.x;
    ball.y = BALL_DATA.y;

    ball.vx = 50 * (Math.random()<0.5 ? 1 : -1);
    ball.vy = 40 * (Math.random()<0.5 ? 1 : -1);
  }

  /**
   * send update to all players
   */
  function sendUpdate() {
    var gameState = getGameState();

    players.forEach(function(player){
      if (player.socket != null){
        player.socket.emit('update', gameState);
      }
    });
  }

  /**
   * add a new player to this game. set the initial data for it.
   *
   * socket - the socket of the new client
   *
   */
  function addPlayer(socket) {
    console.log('new player in game ', id)

    var newPlayer = null;
    var slot = -1;

    // find an available slot for the new player
    for (var i=0; i<players.length; i++){
      if (players[i].socket == null){
        newPlayer = players[i];
        slot = i;
        break;
      }
    }

    sendWelcome(newPlayer, socket, slot);    
  }

  function start(){
    console.log('start game ', id)

    putPlayers();
    putBall();

    started = true;

    players.forEach(function(player){
      player.socket.emit('start', {msg: 'Your game is about to start'})
    });
  }

  function sendWelcome(newPlayer, socket, slot){
    //assign socket to player and configure it
    newPlayer.socket = socket;
    connManager.configPlayerSocket(newPlayer);

    //emit welcome for the new player
    var gameState = getGameState();
    gameState.slot = slot;
    newPlayer.socket.emit('welcome', gameState);

     // emit player event for all others active players
    var newPlayerData = newPlayer.getData();
    newPlayerData.slot = slot;

    for (var i=0; i<players.length; i++){
      var player = players[0];

      if (player.socket != null && i != slot) {
        player.socket.emit('player', newPlayerData);
      }
    }
  }

  /**
   * return a object with full state for the game
   */
  function getGameState() {

    var state = {};
    state.players = [];

    players.forEach(function(player, index){
      if (player.socket != null){
        pState = player.getData();
        pState.slot = index;
        state.players.push(pState);
      }
    });

    state.ball = ball.getData();
    state.gameTime = gameTime;

    return state;
  }

  /**
   * return true if the game has one player for each available slot.
   */
  function isFull() {
    var freeSlots = 0;

    players.forEach(function(player) {
      if (player.socket == null){
        freeSlots++;
      }
    });

    console.log(freeSlots)

    return freeSlots == 0;
  }

  /**
   * export public vars and methods
   */
  this.addPlayer = addPlayer;
  this.isFull = isFull;
  this.init = init;
  this.start = start;
  this.players = players;
  this.fakeLag = fakeLag;
}

module.exports = Game;

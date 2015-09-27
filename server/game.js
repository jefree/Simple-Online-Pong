var Player = require('./player.js')
var ServerConManager = require('./serverConManager')

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

var idCounter = 0;

/**
 * Game object constructor
 */
function Game() {
  console.log('new game ', idCounter);

  var id = idCounter++;
  var gameTime = 0;
  var lastTime = -1;
  var players = [];
  var connManager = new ServerConManager(this);

  var fakeLag = 1000;


  PLAYER_DATA.forEach(function(data){
    players.push(new Player(data, null, this));
  }.bind(this));


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
      sendUpdate(gameState);
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

    players.forEach(function(player){
      if (player.socket != null){
        player.applyInputs(delta);
        console.log(player.y);
      }
    });
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

    if (fakeLag > 0) {
      setTimeout(sendWelcome.bind(null, newPlayer, socket, slot), fakeLag);
    }
    else{
      sendWelcome(null, newPlayer, socket, slot);
    }
  }

  function start(){
    console.log('start game ', id)

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

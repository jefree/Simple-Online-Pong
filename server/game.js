var Player = require('./player.js')

/**
 * Game constants
 */
var GAME_WIDHT = 500;
var GAME_HEIGHT = 500;

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
  var players = [];
  var freeSlots = [0,1];

  /**
   * add a new player to this game. set the initial data for it.
   *
   * socket - the socket of the new client
   *
   */
  function addPlayer(socket) {
    console.log('new player in game ', id)

    var freeSlot = freeSlots.shift();
    var data = PLAYER_DATA[freeSlot];
    var player = new Player(data, socket, this);

    players.push(player);

    player.socket.emit('welcome', {msg: 'welcome to the game '+id});
  }

  function start(){
    console.log('start game ', id)

    players.forEach(function(player){
      player.socket.emit('start', {msg: 'Your game is about to start'})
    });
  }

  /**
   * return true if the game has one player for each available slot.
   */
  function isFull() {
    return freeSlots.length == 0;
  }

  /**
   * export public vars and methods
   */
  this.addPlayer = addPlayer;
  this.isFull = isFull;
  this.start = start;
}

module.exports = Game;

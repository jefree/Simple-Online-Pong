window.onload = function() {

	var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameContainer');

	//game.state.add('Game', Pong.OfflineGame);
  game.state.add('Game', Pong.OnlineGame);

  game.state.start('Game');
}
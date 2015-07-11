var Pong = Pong || {};

Pong.Game = function() {

}

Pong.Game.prototype.preload =  function() {
  console.log('preload');
  this.load.image('paddle', 'src/assets/images/paddle.png');
}

Pong.Game.prototype.create = function() {
  console.log('create')

  this.player = new Pong.Player(this.game, 0, 0, 'paddle');

}

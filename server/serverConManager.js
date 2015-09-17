/**
 * 
 */
function ServerConManager(game){

  function configPlayerSocket(player) {

    player.socket.on('input', function(inputData) {

      console.log('new user input', inputData);

      if (!inputData.pressed) {
        player.vy = 0;
      }
      else if (inputData.key == 'UP') {
        player.vy = -100;
      }
      else if (inputData.key == 'DOWN') {
        player.vy = 100;
      }
    });

  }

  this.configPlayerSocket = configPlayerSocket;

}

module.exports = ServerConManager;

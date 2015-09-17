/**
 * 
 */
function ServerConManager(game){

  function configPlayerSocket(player) {

    player.socket.on('input', function(inputData) {

      console.log('new user input', inputData);

      if (inputData.key == 'UP') {
        player.y -= 1;
      }
      else if (inputData.key == 'DOWN') {
        player.y += 1;
      }
    });

  }

  this.configPlayerSocket = configPlayerSocket;

}

module.exports = ServerConManager;

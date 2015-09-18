/**
 * 
 */
function ServerConManager(game){

  function configPlayerSocket(player) {

    player.socket.on('input', function(inputData){

      if (game.fakeLag > 0){
        //this just for test, it'll remove comment in the fututre
        setTimeout(onInput.bind(null, player, inputData), game.fakeLag);
      }
      else {
        onInput(player, inputData);
      }

    }); 
  }

  /**
   * Process user inputs. update the velocity.
   */
  function onInput(player, inputData) {

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
  }

  this.configPlayerSocket = configPlayerSocket;

}

module.exports = ServerConManager;

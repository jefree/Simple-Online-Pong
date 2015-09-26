/**
 * 
 */
function ServerConManager(game){

  function configPlayerSocket(player) {

    player.socket.on('input', function(inputData){

      if (game.fakeLag > 0){
        //this just for test, it'll remove comment in the fututre
        setTimeout(onInput.bind(null, player, inputData), game.fakeLag/2);
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
    player.inputs.push(inputData);
  }

  this.configPlayerSocket = configPlayerSocket;

}

module.exports = ServerConManager;

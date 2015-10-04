/**
 * 
 */
function ServerConManager(game){

  function configPlayerSocket(player) {

    player.socket.on('input', function(inputData){
      simLag(onInput, game.fakeLag, null, [player, inputData]);
    });

    player.socket.on('ping', function(data){
      simLag(onPing, game.fakeLag, null, [player, data])
    }); 

  }

  /**
   *  Simulate lag over connection
   */
  function simLag(cb, lag, ctx, params) {
    if (lag > 0){
      //this just for test, it'll remove comment in the fututre
      setTimeout(function() {
        cb.apply(ctx, params);
      }, lag);
    }
    else {
      cb.apply(ctx, params);
    }
  }

  /**
   * Process user inputs. update the velocity.
   */
  function onInput(player, inputData) {
    player.inputs.push(inputData);
  }

  /**
   * Respond ping request, it just send back received data.
   */
  function onPing(player, data){
    player.socket.emit('ping', data);
  }

  this.configPlayerSocket = configPlayerSocket;

}

module.exports = ServerConManager;

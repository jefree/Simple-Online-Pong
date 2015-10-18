/**
 * Basic Physic Simulation methods
 */
var sat = require('./sat');
var physics = {};

function collidePlayerBall(rect, ball){
  var separation = sat.collideRectCircle(rect, ball);

  if (separation){
    var dx = Math.abs(separation.x);
    var dy = Math.abs(separation.y);
    
    if (dx > dy){
      ball.vx *= -1;
    }
    else if (dx < dy){
      ball.vy *= -1;
    }
    else {
      ball.vx *= -1;
      ball.vy *= -1; 
    }

    ball.x -= separation.x;
    ball.y -= separation.y;
  }
}

function createBody(entity) {
  return {
    top: entity.y,
    left: entity.x,
    right: entity.x + entity.width,
    bottom: entity.y + entity.height 
  }
}

physics.createBody = createBody;
physics.collidePlayerBall = collidePlayerBall;

module.exports = physics;

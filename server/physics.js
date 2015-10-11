/**
 * Basic Physic Simulation methods
 */
var sat = require('./sat');
var physics = {};

function intersect(entity, ball){
  return sat.collideRectWithCircle(entity, ball);
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
physics.intersect = intersect;

module.exports = physics;

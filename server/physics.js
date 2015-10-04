/**
 * Basic Physic Simulation methods
 */

var physics = {};

function intersect(entity1, entity2) {

  var body1 = createBody(entity1);
  var body2 = createBody(entity2);

  if (body1.right <= body2.left) {
    return false;
  }

  if (body1.left >= body2.right) {
    return false;
  }

  if (body1.bottom <= body2.top) {
    return false;
  }

  if (body1.top >= body2.bottom) {
    return false;
  }

  return true;
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

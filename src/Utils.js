var Pong = Pong  || {};

Pong.Utils = {};

Pong.Utils.center = function(pw, cw) {
  return pw/2 - cw/2;
}


Pong.Utils.intersect = function(sprite1, sprite2) {

  var body1 = Pong.Utils.createBody(sprite1);
  var body2 = Pong.Utils.createBody(sprite2);

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

Pong.Utils.createBody = function(sprite) {
  return {
    top: sprite.y,
    left: sprite.x,
    right: sprite.x + sprite.width,
    bottom: sprite.y + sprite.height 
  }
}
var Vector2 = require('./linear').Vector2;

function Shape() {
  var self = this;

  self.vertices = [];
  self.axes = [];

  self.add_vertice = function(x, y){
    var vertice = new Vector2(x, y);
    self.vertices.push(vertice);
  }

  self.calculate_axes = function(){
    for (var i=0; i<self.vertices.length; i++){
      var v1 = self.vertices[i];
      var v2 = (i<self.vertices.length-1) ? self.vertices[i+1] : self.vertices[0];

      var axis = v2.subtract(v1);

      axis = axis.perp().normalize();

      self.axes.push(axis);
    }
  }

  self.projection = function(axis) {

    var min = axis.dot(self.vertices[0]);
    var max = min;

    for (var i=1; i<self.vertices.length; i++){
      var value = axis.dot(self.vertices[i]);

      if (value < min){
        min = value;
      }
      else if (value > max){
        max = value;
      }
    }

    return {min: min, max: max};
  }
}

function rectGetVerticesShape(rect){

  var shape = new Shape();

  shape.add_vertice(rect.x, rect.y);
  shape.add_vertice(rect.x+rect.width, rect.y);
  shape.add_vertice(rect.x+rect.width, rect.y+rect.height);
  shape.add_vertice(rect.x, rect.y+rect.height);

  return shape;
}

function projectCircle(circle, axis){
  var proj = axis.dot(circle);
  return { min: proj-circle.r, max: proj+circle.r };
}

function overlapProj(proj1, proj2) {

  var test1 = proj1.min - proj2.max;
  var test2 = proj2.min - proj1.max;

  if (test1 > 0 || test2 > 0){
    return false;
  }

  return test1;
}

function distanceSqrBetween(v1, v2){
  return Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2);
}

function collideAlignedRect(rect1, rect2){

  var axes = [
    new Vector2(1, 0),
    new Vector2(0, 1)
  ];

  var s1 = rectGetVerticesShape(rect1);
  var s2 = rectGetVerticesShape(rect2);

  for (var i=0; i<axes.length; i++){
    var axis = axes[i];
    var s1Proj = s1.projection(axis);
    var s2Proj = s2.projection(axis);

    if (!overlapProj(s1Proj, s2Proj)){
      return false;
    }
  }

  return true;
}

function collideRectCircle(rect, circle) {

  var shape = rectGetVerticesShape(rect);
  shape.calculate_axes();

  //find the closest vertex to the circle's center
  var closest = shape.vertices[0];
  var closestDist = distanceSqrBetween(closest, circle);

  for (var i=1; i<shape.vertices.length; i++){
    var vertex = shape.vertices[i];
    var distance = distanceSqrBetween(vertex, circle);

    if (distance < closestDist){
      closest = vertex;
      closestDist = distance;
    }
  }

  //get vector from closest vertex to circle's center
  var axis = closest.subtract(circle);
  axis.normalize();

  var circleProj = projectCircle(circle, axis);
  var shapeProj = shape.projection(axis);

  var mvt = axis;
  var mvtDistance = overlapProj(shapeProj, circleProj);

  if (!mvtDistance){
    return false;
  }

  mvtDistance = Math.abs(mvtDistance);

  //check the axes for the rectangle
  for (var i=0; i<shape.axes.length; i++){
    var axis = shape.axes[i];
    var shapeProj = shape.projection(axis);
    var circleProj = projectCircle(circle, axis);

    var overlap = overlapProj(shapeProj, circleProj);

    if (!overlap){
      return false;
    }
    else{
      overlap = Math.abs(overlap);

      if (overlap < mvtDistance){
        mvt = axis;
        mvtDistance = overlap;
      }
    }
  }

  return mvt.multi(mvtDistance);
}

module.exports.collideAlignedRect = collideAlignedRect;
module.exports.collideRectCircle = collideRectCircle;

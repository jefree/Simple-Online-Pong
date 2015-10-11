function Vector2(x, y){
  var self = this;

  self.x = x || 0;
  self.y = y || 0;

  self.subtract = function(vector){
    var result = new Vector2();

    result.x = self.x - vector.x;
    result.y = self.y - vector.y;

    return result;
  }

  self.dot = function(vector){
    return self.x*vector.x + self.y*vector.y;
  }

  self.normalize = function(){
    var length = Math.sqrt(self.x*self.x + self.y*self.y);

    self.x = self.x / length;
    self.y = self.y / length;

    return self;
  }

  self.normalized = function(){
    var newVector = new Vector2() 
    var length = Math.sqrt(self.x*self.x + self.y*self.y);

    newVector.x = self.x / length;
    newVector.y = self.y / length;

    return newVector;
  }

  self.perp = function(){
    var perp = new Vector2();

    perp.x = -self.y;
    perp.y = self.x;

    return perp;
  }

  self.toString = function(){
    return "{"+self.x+", "+self.y+"}";
  }
}


module.exports.Vector2 = Vector2;

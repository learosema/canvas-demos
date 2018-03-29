var d = document
var $ = d.querySelector.bind(d)
var V = Array
var def = Object.defineProperty.bind()

Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

// rotation 
function _rot(vertex, i, j, d) {
  var x = vertex[i]
  var y = vertex[j]
  vertex[i] =  x * cos(d) + y * sin(d)
  vertex[j] = -x * sin(d) + y * cos(d)
  return vertex
}

// rotate vertex around X-axis
V.prototype.rotX = function(x) {
    return _rot(this, 1, 2, x)
}

// rotate vertex around Y-axis
V.prototype.rotY = function(y) {
    return _rot(this, 0, 2, y)
}

// rotate vertex around Y-axis
V.prototype.rotZ = function(z) {
    return _rot(this, 0, 1, z)
}

V.prototype.add = function (v) {
  if (v instanceof Array)
    for(var i = 0; i < v.length; i++)
      this[i]+=v[i]||0
  return this;
}

// [1,2,3].x // 1
def(V.prototype, "x", {
    get: function(){ return this[0] },
    set: function(val){ this[0] = val }
})

// [1,2,3].y // 2
def(V.prototype, "y", {
    get: function(){ return this[1] },
    set: function(val){ this[1] = val }
})

// [1,2,3].z // 3
def(V.prototype, "z", {
    get: function(){ return this[2] },
    set: function(val){ this[2] = val }
})

// project to 2d coordinates, 
// vanishing point at the center
V.prototype.to2D = function () {
    var k = .5 + this.z / 2000
    return [w/2 + this.x*k, h/2 + this.y*k]
}

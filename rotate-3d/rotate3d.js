var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');

with(Math) S = sin, C = cos;

V ="111511551151155555515115336330303363033633"; // vertices
P ="67856845847801912923903901a16a67a07a" + 
   "23b25b45b34b03c34c47c07c12d25d56d16d"; // trigons
f="rgba(0,0,0,1)"
// initialize canvas width and height (and some vars)
b.style.margin=X=Y=Z=0;
c.style.display="block";
w=c.width=innerWidth;
h=c.height=innerHeight;
v=120;

// Simple rotation: 
// R(vertex, 1, 2, d) rotate around X-axis
// R(vertex, 0, 2, d) rotate around Y-axis
// R(vertex, 0, 1, d) rotate around Z-axis
function R(vertex, i, j, d) {
  var x = vertex[i];
  var y = vertex[j];
  vertex[i] =  x * C(d) + y * S(d);
  vertex[j] = -x * S(d) + y * C(d);
  return vertex;
}

// Simple 3d-to-2d projection (vanishing point perspective, 
// with the vanishing point at the center of the screen)
function T(vertex) {
  var k=1/2 + vertex[2]/2000;
  return [w/2 + vertex[0]*k, h/2 + vertex[1]*k];
}

// Select vertex from vertex array
function $(i) { 
  return [z*(V[i++]-3),z*(V[i++]-3),z*(V[i++]-3)];
}

// All in one: 
// select vertex index from trigon definition, 
// select vertex from vertex array, 
// rotate around X- and Y- axis and 
// convert it to 2d coordinates
function U(p) {
  return T(R(R(R($(3*("0x"+P[p])),1,2,X),0,2,Y),0,1,Z));
}

~function mainLoop(){
  var i=0;
  a.fillStyle=f;
  a.fillRect(0, 0, w, h); // fade out
  for(p=0; p<P.length; p++) { 
      // for all points in the trigon array
      z=v+C(X)*60;
      
      a.beginPath();
      u=U(p); // moveto-point 0
      a.moveTo(C(X)*v+u[0],S(Y)*v+u[1]);
      u=U(++p); // lineto point 1
      a.lineTo(C(X)*v+u[0],S(Y)*v+u[1]);
      u=U(++p); // lineto point 2
      a.lineTo(C(X)*v+u[0],S(Y)*v+u[1]);
      a.closePath(); // close trigon
      if (wireframe.checked) {
        a.strokeStyle=filled.checked?"#505":"#4cf";
    	  a.stroke();
      }
      if (filled.checked) {
        a.fillStyle=i%2==0? "rgba(127,0,127,0.1)":"rgba(255,0,255,0.1)";
        a.fill();
      }
      i++;
  }
  X+=2/v;Y+=4/v;Z+=1/v;
  requestAnimationFrame(mainLoop);
}()

fading.onchange=function () {
	var alpha = (10-fading.value)/10;
  f='rgba(0,0,0,'+alpha+')';
}

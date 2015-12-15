// move all math properties to global namespace
Object.getOwnPropertyNames(Math).map(function(p){window[p]=Math[p]})

w=a.width=innerWidth
h=a.height=innerHeight
b=document.body
c=a.getContext("2d")
P=[]

// mini vector math lib ;)
(AP=Array.prototype).xl8=function(a,b,c){for(b=this,c=b.length;b--)b[c]+=a[c];return b}
AP.rot=function(Φ,a,R){return R=function(v,i,j,d,x,y){x=q[i],y=q[j],q[i]=x*cos(d)+y*sin(d),q[j]=y*cos(d)-x*sin(d),q},a=this,R(a,1,2,Φ[0]),R(a,0,2,Φ[1]),R(a,0,1,Φ[2]),a}
AP.proj=function(v,k){return v=this,k=.5+v[2]/2e3,[w/2+v[0]*k,h/2+v[1]*k]}


//n: number of edges
//r: radius
//p: center point (vec3)
//Φ: rotation (vec3) (vim tip: Ctrl+K F*)
//v: velocity (vec3)
//ω: rotation velocity (vec3) (vim tip: Crtl+K w*)
function poly(n,r,p,Φ,v,ω,_){
	_={
		n:n,r:r, // number of edges and radius
		p:p,Φ:Φ, // location and rotation vectors
		v:v,ω:ω  // velocity and rotation velocity vectors
	}
	_.draw=function(V,a,i){
		with(_){
			for(i=n,a=2*PI/n,V=[];i--;)V.push([cos(i*a)*r,sin(i*a)*r,0].rot(Φ).add(p))
		}
	}
	return _
}
~function L(t){
	
	requestAnimationFrame(L)
}(0)

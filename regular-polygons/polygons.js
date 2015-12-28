// move all Math.* to global namespace (© @thebabydino, thanks!)
Object.getOwnPropertyNames(Math).map(function(p){window[p]=Math[p]})

w=a.width=innerWidth
h=a.height=innerHeight
B=document.body
c=a.getContext("2d")
P=[]

// add some vector math helpers to Array prototype:
→=Array.prototype
→.add=function(a,b,c){for(b=this,c=b.length;c--;)b[c]+=a[c];return b}
→.mul=function(a,b,c){for(b=this,c=b.length;c--;)b[c]*=a;return b}
→.rot=function(Φ,a,R){return R=function(v,i,j,d,x,y){x=q[i],y=q[j],q[i]=x*cos(d)+y*sin(d),q[j]=y*cos(d)-x*sin(d),q},a=this,R(a,1,2,Φ[0]),R(a,0,2,Φ[1]),R(a,0,1,Φ[2]),a}
→.proj=function(v,k){return v=this,k=.5+v[2]/2e3,[w/2+v[0]*k,h/2+v[1]*k]}
→.vlen=function(a,b,r){for(r=0,b=this,a=this.length;a--;)r+=b[a]*b[a];return sqrt(r)}
→.v1=function(a,l){return a=this,l=a.vlen(),l==0?a:a.mul(1/l)}

//create a regular n-edged polygon
function poly(n,r,p,Φ,v,ω){
	this.n=n // number of edges
	this.r=r // radius
	this.p=p // vec3 position
	this.Φ=Φ // vec3 rotation
	this.v=v // vec3 velocity
	this.ω=ω // vec3 rotation velocity
}

poly.prototype.draw=function(V,a,i){
	
}

~function L(t){
	
	requestAnimationFrame(L)
}(0)

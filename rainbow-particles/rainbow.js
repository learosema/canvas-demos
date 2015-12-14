N=2000
R=Math.random
w=a.width=innerWidth
h=a.height=innerHeight
b=document.body
c=a.getContext("2d")
p=[]
g=0.0981 // 9.81m/s² ;)
function P(x,y,c){
	return{x:x,y:y,vx:R()*6-3,vy:-R()*6,c:c}
}
~function L(t){
	p.push(P(w/2,h/2,((t/20)%360)|0))
	c[F="fillStyle"]='rgba(0,0,0,.2)'
	c[Q="fillRect"](0,0,w,h)
	q=[]
	for(i=p.length;i--;){
		c[F]='hsl('+p[i].c+',50%,50%)'
		c[Q](p[i].x-4,p[i].y-4,8,8)
		p[i].x+=p[i].vx
		p[i].y+=p[i].vy
		p[i].vy+=g
		p[i].c=(p[i].c+1)%360
		if(R()<.01)q.push(P(p[i].x,p[i].y,p[i].c))
	}
	Array.prototype.push.apply(p,q)
	if(p.length>N)p.splice(0,p.length-N)
	requestAnimationFrame(L)
}(0)

with(Math)R=random,S=sin
c=a.getContext("2d")
w=a.width=innerWidth
h=a.height=innerHeight
function heart(x,y,s,color){
	c.fillStyle=color
	c.font=s+"px monospace"
	c.fillText("\u2764",x,y)
}

~function L(t){
	t=t/1e3
	c.fillStyle='rgba(0,0,0,.05)'
	c.fillRect(0,0,w,h)
	for(i=9;i--;)heart(R()*w,R()*h,(200+S(t)*100)|0,['#0055A4','#fff','#EF4135'][(i+((4*t)|0))%3])
	setTimeout(function() {
		requestAnimationFrame(L)
	},50)
}(0)

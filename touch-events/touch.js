with(Math)S=sin,C=cos,π=PI,deg=π/180,R=random,Q=sqrt
with(b.style)margin=0,overflow="hidden",backgroundColor='#222'
a.style.width=a.style.height="100%"
g=this
W=a.width=innerWidth
H=a.height=innerHeight
T=[]

// get distance between 2 points
function distance(x1, y1, x2, y2) {
	var dx = x2 - x1, dy = y2 - y1
	return Q(dx*dx + dy*dy)|0
}
g.onresize=setSize=function(){
	oldH=H
	W=a.width=innerWidth
	H=a.height=innerHeight
}

function color(i,j){
	return "hsl("+((((i*18+j*4)|0))%360)+",100%,50%)"
}

function getTouch(id,i){
	for(i=T.length;i--;)
		if(T[i].id==id)return i
	return -1
}

g.ontouchstart=function(e,t,o){
	for(t=e.changedTouches,i=t.length;i--;){
		o={
			id:t[i].identifier,
			x:t[i].clientX,
			y:t[i].clientY,
			n:0
		}
		console.log(o)
		c.beginPath()
		c.arc(o.x,o.y,25,0,2*π,false)
		c.fillStyle=color(o.id, o.n)
		c.fill()
		T.push(o)
	}
}

g.ontouchmove=function(e,t,i,j,o){
	for(t=e.changedTouches,i=t.length;i--;){
		j=getTouch(t[i].identifier)
		if(j>-1){
			o=T[j]
			c.lineWidth=50
			c.lineCap="round"
			c.beginPath()
			c.moveTo(o.x,o.y)
			o.x=t[i].clientX
			o.y=t[i].clientY
			c.lineTo(o.x,o.y)
			c.strokeStyle=color(o.id,++o.n)
			c.stroke()
		}
	}
}



/*
g.ontouchcancel=function(e,t,i,j){
	for(t=e.changedTouches,i=t.length;i--;){
		j=getTouch(t[i].identifier)
		if(j>-1){
			T.splice(j,1)
		}
	}
}*/
~function L(t) {
	c.fillStyle="rgba(0,0,0,.1)"
	c.fillRect(0,0,W,H)
	t/=1e3
	requestAnimationFrame(L)
}(0)


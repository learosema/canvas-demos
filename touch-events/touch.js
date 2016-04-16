with(Math)π=PI
with(b.style)margin=0,overflow="hidden",backgroundColor='#222'
a.style.width="100vw"
a.style.height="100vh"
g=this
W=a.width=innerWidth
H=a.height=innerHeight
m=null
T=[]

g.onresize=setSize=function(){
	oldH=H
	W=a.width=innerWidth
	H=a.height=innerHeight
}

function color(i,j){
	return "hsl("+(((((i|0)*36+j*8)|0))%360)+",100%,50%)"
}

function getTouch(id,i){
	for(i=T.length;i--;)
		if(T[i].id==id)return i
	return -1
}

begin=function(o){
	c.beginPath()
	c.arc(o.x,o.y,25,0,2*π,false)
	c.fillStyle=color(o.id, o.n)
	c.fill()
}

move=function(o,x,y){
	c.lineWidth=50
	c.lineCap="round"
	c.beginPath()
	c.moveTo(o.x,o.y)
	o.x=x
	o.y=y
	c.lineTo(o.x,o.y)
	c.strokeStyle=color(o.id,++o.n)
	c.stroke()
}


ontouchstart=function(e,t,o){
	for(t=e.changedTouches,i=t.length;i--;){
		o={id:t[i].identifier,x:t[i].clientX,y:t[i].clientY,n:i*10}
		begin(o)
		T.push(o)
	}
}

ontouchmove=function(e,t,i,j,o){
	for(t=e.changedTouches,i=t.length;i--;){
		j=getTouch(t[i].identifier)
		if(j>-1){
			o=T[j]
			move(o,t[i].clientX,t[i].clientY)
		}
	}
}

ontouchend=function(e,t,i,j){
	for(t=e.changedTouches,i=t.length;i--;){
		j=getTouch(t[i].identifier)
		if(j>-1){
			T.splice(j,1)
		}
	}
}

onmousedown=function(e,o){
	m={id:"mouse",x:e.clientX,y:e.clientY,n:88}
}

onmousemove=function(e,o,j){
	if(!m)return
	move(m,e.clientX,e.clientY)
}

onmouseup=function(){
	m=null
}

// fading out. If you don't like it, feel free to 
// fork and comment it out :)
~function L(t) {
	c.fillStyle="rgba(0,0,0,.1)"
	c.fillRect(0,0,W,H)
	t/=1e3
	requestAnimationFrame(L)
}(0)


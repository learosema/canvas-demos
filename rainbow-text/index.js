c=a.getContext('2d')
w=a.width=1280
h=a.height=768
with(Math)S=sin,C=cos,R=random,pi=PI
T="#rainbowTextWeekend"
F=64
k=0
l=w/F|0+2
~function L(){
	c[C="fillStyle"]='rgba(0,0,0,.4)'
	c.fillRect(0,0,w,h)
	c.font=F+'px monospace'
	for(j=10;j--;)
		for(i=l;i--;)
			c[C]='hsla('+(k+j*36)%360+',100%,50%,.9)',
			c.fillText(T[(i+j)%T.length],i*F,h/2-5*F+j*F+S((i*10+j*j*pi+k)*pi/180)*h/4)
	k=(k+3)%360
	requestAnimationFrame(L)
}()

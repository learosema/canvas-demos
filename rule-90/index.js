w=a.width=160
h=a.height=100
r=90
for(W=[],i=320;i--;)W[i]=(i==w/2)?1:0
~function L(){
	for(N=[],i=w;i--;)
		c.fillStyle=['#333','#fff'][W[i]],
		c.fillRect(i,h-1,1,1),
		k=4*(W[i-1]|0)+(W[i]*2)+(W[i+1]|0),
		N[i]=(r&Math.pow(2,k))>0?1:0
	W=N
	B=c.getImageData(0,1,w,h-1)
	c.putImageData(B,0,0)
	requestAnimationFrame(L)
}()

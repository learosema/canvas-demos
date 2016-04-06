R=Math.random,ξ=Math.sqrt
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
W=a.width=innerWidth
H=a.height=innerHeight
r=Math.min(W,H)
n=N=0
b.appendChild(T=document.createElement("div"))
with(T.style)position='absolute',right=top=0,font='5vh monospace',color='#fff'
~function L(t){
	for(i=5;i--;){
		x=R()*r|0
		y=R()*r|0
		l=ξ(x*x+y*y)
		c.fillStyle=(l<r)?'hsl('+((((t+i)/1000)|0)%360)+',100%,50%)':'#333'
		c.fillRect(x,y,2,2)
		n+=l<r?1:0
		N++
	}
	T.innerHTML=[
		"Happy π day!",
		"n (no. points within unit circle) = " + n,
		"N (no. total points) = " + N,
		"4 * n/N = "+4*n/N
	].join("<br>")
	requestAnimationFrame(L)
}(0)


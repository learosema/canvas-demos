b.style.margin=0
b.style.overflow="hidden"
S=new AudioContext()
for(i=12,N=[];i--;){
	O=S.createOscillator()
	G=S.createGain()
	G.gain.value=0
	O.connect(G)
	G.connect(S.destination)
	O.type=["triangle","sine","sawtooth"][i>>2]
	O.frequency.value=[1056,264,528][i>>2]*Math.pow(2,[2,-3,7,4][i%4]/12)
	N[i]=G.gain
	O.start()
}
V=1
T=this
T.onblur=function(){for(i=12;i--;)N[i].value=0}
~function L(l){
	l=(l/50)|0
	W=a.width=innerWidth
	H=a.height=innerHeight
	w=W/4
	h=H/3
	for(j=3;j--;)
		for(i=4;i--;)
			X=l&(1<<(j*4+3-i)),
			c.fillStyle=X?'hsl('+((l*(1+i)*(1+j))%360)+',100%,50%)':'#000',
			N[j*4+3-i].value=V*(X?[3e-3,4e-2,1e-2][j]:0),
			c.fillRect(i*w+2,j*h+2,w-4,h-4)
	requestAnimationFrame(L)
}(0)
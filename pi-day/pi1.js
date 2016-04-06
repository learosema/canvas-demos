S=new AudioContext()
O=S.createOscillator()
G=S.createGain()
O.connect(G)
G.connect(S.destination)
G.gain.value=0
O.start()
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
a.style.width=a.style.height="100%"
W=a.width=((innerWidth/200)|0)-1
H=a.height=innerHeight
console.log(W,a.width,H,a.height);
for(B=[],i=25;i--;)B[i]=1<<i
function expm(p,ak,i,j,p1,pt,r){ 
	if(ak==1)return 0
	for(i=0;i<25;i++)if(B[i]>p)break
	pt=B[i-1]
	p1=p
	r=1
	for(j=1;j<=i;j++){
		if(p1>=pt){
			r=16*r
			r=r-((r/ak)|0)*ak
			p1=p1-pt
		}
		pt=0.5*pt
		if (pt>=1)
			r=r*r,
			r=r-((r/ak)|0)*ak
	}
	return r
}
function Ox(x,i,y,r){ 
// just like (x*Math.pow(16,16)).toString(16), but can handle bigger numbers
	y=Math.abs(x)
	for(r=[],i=0;i<16;i++)
		y=16*(y-(y|0)),
		r[i]=(y|0).toString(16)
	return r
}
function Σ(m,id,k,ak,p,s,t){
	s=0
	for(k=0;k<id;k++){
		ak=8*k+m
		p=id-k
		t=expm(p,ak)
		s=s+t/ak
		s=s-(s|0)
	}
	for(k=id;k<=id+100;k++){
		ak=8*k+m
		t=Math.pow(16,(id-k))/ak
		if(t<1e-17)break
		s=s+t
		s=s-(s|0)
	}
	return s
}
function π(id,r){
	return r=4*Σ(1,id)-2*Σ(4,id)-Σ(5,id)-Σ(6,id),r=r-(r|0)+1,Ox(r)
}

~function L(t) {
	c.fillStyle="rgba(0,0,0,0.1)"
	c.fillRect(0,0,W,H)
	T=((t/120)|0)%1e4
	for(y=0;y<10;y++)
	for(x=0,d=π(T+y*8);x<8;x++)
		hue=(("0x"+d[x])*20)%360,
		c.fillStyle='hsla('+hue+',100%,50%,1.0)',
		c.fillRect(x,y,1,1)
	requestAnimationFrame(L);
}(0)

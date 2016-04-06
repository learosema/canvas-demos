with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
a.style.width=a.style.height="100%"
W=a.width=innerWidth>>5
H=a.height=innerHeight>>5
for(B=[],i=25;i--;)B[i]=1<<i
function expm(p,ak,i,j,p1,pt,r){ // 16^p mod ak
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
function Ox(x,i,y,r){ // fraction to hex
	y=Math.abs(x)
	for(r=[],i=0;i<16;i++)
		y=16*(y-(y|0)),
		r[i]=(y|0).toString(16)
	return r
}
function Σ(m,id,k,ak,p,s,t){ // sum_k 16^(id-k)/(8*k+m)
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


Π=π(0).slice(0,8)
x=W/2
y=H/2
i=v=0
~function L(t) {
	c.fillStyle="rgba(0,0,0,0.04)"
	if(i%4==0)c.fillRect(0,0,W,H)
	if(i>=Π.length)
		Array.prototype.push.apply(Π,π(i).slice(0,8))
	v1=((('0x'+Π[i])|0))%16
	x1=x+Math.cos((v1*22.5)*Math.PI/180)*4
	y1=y+(Math.sin((v1*22.5)*Math.PI/180))*4
	c.beginPath()
	c.moveTo(x,y)
	c.lineTo(x1,y1)
	x=x1,y=y1,v=v1
	if(x<0||x>W)x+=x<0?W:-W
	if(y<0||y>H)y+=y<0?H:-H
	c.strokeStyle='hsl('+((t/10)|0)+',100%,65%)'
	c.strokeWidth='50px'
	c.stroke()
	i++
	requestAnimationFrame(L)
}(0)

with(Math)R=random,Q=sqrt,S=sin,C=cos,A=abs,P=pow,M=max
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
with(a.style)width="100vw",height="100vh"
ff=255,mb=M(innerWidth,innerHeight)<800
function SZ(){
	if(mb&&W==innerWidth)return
	W=a.width=(innerWidth/(mb?2:3))|0
	H=a.height=(innerHeight/(mb?2:3))|0
}
SZ()
this.onresize=SZ
// Generate textures
i1=new ImageData(256,256)
i2=new ImageData(256,256)
for(Y=256;Y--;)
	for(X=256;X--;){
		x=X-128
		y=Y-128
		offs=(Y<<10)+(X<<2)
		v1=(Q(x*x+y*y)|0)
		v2=(127+(S(.03*(A(x)+A(y)))+S(.03*(x*x+y*y))+S(.003*(P(A(x),1.5)+P(A(y),1.5)))*ff/3))|0
		i1.data[offs  ]=(v1&31)*8
		i1.data[offs+1]=(v1&31)
		i1.data[offs+2]=(v1&15)*16
		i1.data[offs+3]=ff
		i2.data[offs  ]=v2
		i2.data[offs+1]=0
		i2.data[offs+2]=v2
		i2.data[offs+3]=ff
	}
// uncomment to see the textures :)
// c.putImageData(i1,0,0)
// throw Error("Stop! I'd like to see texture 1 :)")
// c.putImageData(i2,0,0)
// throw Error("Stop! I'd like to see texture 2 :)")

xx=[0,0,0,0]
yy=[0,0,0,0]
xφ=[0,0,0,0]
yφ=[0,0,0,0]
xω=[.0291,.0115,.0464,.0337]
yω=[.0064,.0045,.0403,.0422]

I=new ImageData(W,H)


function loc(x,y) {return (y*256+x)*4}
~function L(t){
	t/=10
	for(i=4;i--;)
		xx[i]=(C(xφ[i])+1)*128,
		yy[i]=(C(xφ[i])+1)*128,
		xφ[i]+=xω[i],yφ[i]+=yω[i]
	for(y=H;y--;)
		for(x=W;x--;) {
			dest=(y*W+x)*4
			o=[]
			for(i=4;i--;)o[i]=loc(((xx[i]|0)+x)&ff,((yy[i]|0)+y)&ff)
			I.data[dest  ]=(i1.data[o[0]  ]+i1.data[o[1]  ]+i2.data[o[2]  ]+i2.data[o[3]  ]+t)&ff
			I.data[dest+1]=(i1.data[o[0]+1]+i1.data[o[1]+1]+i2.data[o[2]+1]+i2.data[o[3]+1])&ff
			I.data[dest+2]=(i1.data[o[0]+2]+i1.data[o[1]+2]+i2.data[o[2]+2]+i2.data[o[3]+2]+t)&ff
			I.data[dest+3]=ff
		}
	c.putImageData(I,0,0)
	requestAnimationFrame(L)
}(0)


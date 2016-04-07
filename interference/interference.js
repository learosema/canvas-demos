with(Math)R=random,Q=sqrt,S=sin,C=cos,A=abs,P=pow
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
W=a.width=innerWidth/4
H=a.height=innerHeight/4
ff=255
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
		i1.data[offs+1]=(v1&63)*4
		i1.data[offs+2]=(v1&15)*16
		i1.data[offs+3]=ff
		i2.data[offs  ]=v2
		i2.data[offs+1]=v2%64
		i2.data[offs+2]=v2
		i2.data[offs+3]=ff
	}
// uncomment the throw Errors here to see the textures :)
c.putImageData(i1,0,0)
// throw Error("Stop! I'd like to see texture 1 :)")
c.putImageData(i2,0,0)
// throw Error("Stop! I'd like to see texture 2 :)")

xx=[0,0,0,0]
yy=[0,0,0,0]
xφ=[0,0,0,0]
yφ=[0,0,0,0]
xω=[.0291,.0115,.0464,.0337]
yω=[.0064,.0045,.0403,.0422]

I=new ImageData(W,H)



function Px(x,y,xx,yy,t,i){
	//test
	o0=(y*W+x)*4
	I.data[i0+3]=ff
	for(i=3;i--;)I.data[o0+i]=t&ff
	for(i=4;i--;)
		o1=((xx[i]+x)&ff)+(4*((yy[i]+y)&ff)),
		I.data[o0  ]+=i1.data[o1  ],
		I.data[o0+1]+=i1.data[o1+1],
		I.data[o0+2]+=i1.data[o1+2]
}


~function L(t){
	t/=1e3
	for(i=4;i--;)
		xx[i]=(C(xφ[i])+1)*128,
		yy[i]=(C(xφ[i])+1)*128,
		xφ[i]+=xω[i],yφ[i]+=yω[i]
	for(y=H;y--;)
		for(x=W;x--;)
			Px(x,y,xx,yy,t|0)
/*
           for y := 0 to maxy - 1 do
            for x := 0 to maxx - 1 do
              plot (x,y) with color 
                texture1[(x1+x) & 255, (y1+y) & 255] +
                texture1[(x2+x) & 255, (y2+y) & 255] +
                texture2[(x3+x) & 255, (y3+y) & 255] +
                texture2[(x4+x) & 255, (y4+y) & 255] + t;
 
 
 */
	c.putImageData(I,0,0)
	requestAnimationFrame(L)
}(0)


with(Math)R=random,Q=sqrt,S=sin,C=cos,A=abs,P=pow
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
W=a.width=256
H=a.height=256
// Generate textures
i1=new ImageData(256,256)
i2=new ImageData(256,256)
for(Y=256;Y--;)
	for(X=256;X--;){
		x=X-128
		y=Y-128
		offs=(Y<<10)+(X<<2)
		v1=(Q(x*x+y*y)|0)
		v2=(127+(S(.03*(A(x)+A(y)))+ S(.03*(x*x+y*y))+S(.003*(P(A(x),1.5)+P(A(y),1.5)))*255/3))|0
		i1.data[offs]  =((Q(x*x+y*y)|0)&31)*8
		i1.data[offs+1]=((Q(x*x+y*y)|0)&63)*4
		i1.data[offs+2]=((Q(x*x+y*y)|0)&15)*16
		i1.data[offs+3]=255
		
		i2.data[offs]  = v2
		i2.data[offs+1]  = v2%64
		i2.data[offs+2]  =  v2
		i2.data[offs+3]  = 255
	}

c.putImageData(i1,0,0)
t1=a.toDataURL()
c.putImageData(i2,0,0)

xφ1=xφ2=xφ3=xφ4=yφ1=yφ2=yφ3=yφ4=0
xω1=.0291,xω2=.0115,xω3=.0464,xω4=.0337
yω1=.0064,xω2=.0045,yω3=.0403,yω4=.0422

I=new ImageData(256,256)

~function L(t){
	x1=(cos(xφ1)+1)*128
	x2=(cos(xφ2)+1)*128
	x3=(cos(xφ3)+1)*128
	x4=(cos(xφ4)+1)*128
	y1=(cos(yφ1)+1)*128
	y2=(cos(yφ2)+1)*128
	y3=(cos(yφ3)+1)*128
	y4=(cos(yφ4)+1)*128

	for(y=H;y--;)
		for(x=W;x--;)

/*
           for y := 0 to maxy - 1 do
            for x := 0 to maxx - 1 do
              plot (x,y) with color 
                texture1[(x1+x) & 255, (y1+y) & 255] +
                texture1[(x2+x) & 255, (y2+y) & 255] +
                texture2[(x3+x) & 255, (y3+y) & 255] +
                texture2[(x4+x) & 255, (y4+y) & 255] + t;
 
 
 */
	xφ1+=xω1
	xφ2+=xω2
	xφ3+=xω3
	xφ4+=xω4
	yφ1+=yω1
	yφ2+=yω2
	yφ3+=yω3
	yφ4+=yω4
	requestAnimationFrame(L)
}(0)


N=innerWidth<800?27:87 // number of bugs
                       // 60 bugs less on mobile :) 
with(Math)S=sin,C=cos,π=PI,deg=π/180,R=random,Q=sqrt
with(b.style)margin=0,overflow="hidden",backgroundColor='#000'
a.style.width=a.style.height="100%"
W=a.width=(innerWidth/1.2)|0
H=a.height=(innerHeight/1.2)|0
// rotate 2d
function rot2d(x,y,d){
	return [x*C(d*deg)+y*S(d*deg), 
		   -x*S(d*deg)+y*C(d*deg)]
}
// get distance between 2 points
function distance(x1,y1,x2,y2) {
	var dx=x2-x1,dy=y2-y1
	return Q(dx*dx+dy*dy)
}

// The Bug Class :)
function Bug(x,y,r,v) {
	this.x=x
	this.y=y
	this.r=r||0
	this.v=v||1
}

Bug.prototype.move = function (v) {
	var r=this.r
	v=v || this.v
	this.x+=C(r*deg)*v
	this.y-=S(r*deg)*v
	if(this.x>W+10)this.x-=W+10
	if(this.y>H+10)this.y-=H+10
	if(this.x<-10)this.x+=W+10
	if(this.y<-10)this.y+=H+10
}

Bug.prototype.render = function (t) {
	var r=this.r,x=this.x,y=this.y,x1,y1,x2,y2
	c.fillStyle='#732'
	c.beginPath()
	c.arc(x,y,10,0,2*Math.PI)
	c.fill()
	c.strokeStyle='#732'
	c.lineWidth=2
	var legs=[-5,-12,-5,12,
		       5,-12, 5,12,
		       0,-13, 0,13,
		       7,-1 , 13,-4,
		       7, 1 , 13, 4]
	for(var l=0;l<5;l++){
		x1=legs[l*4]   
		y1=legs[l*4+1]
		x2=legs[l*4+2]
		y2=legs[l*4+3]
		if(l<3){
			var s=S(t/30)*1.5*Math.pow(-1,l)
			x1+=s
			x2-=s
		}
		p1=rot2d(x1,y1,r)
		p2=rot2d(x2,y2,r)
		c.beginPath()
		c.moveTo(x+p1[0],y+p1[1])
		c.lineTo(x+p2[0],y+p2[1])
		c.stroke()
	}
}

Bug.prototype.collidesWith=function (b1) {
	var b=this
	var d=distance(b.x,b.y,b1.x,b1.y)
	return d<20
}


bugs=[]
for(i=N;i--;)bugs[i]=new Bug((R()*W)|0,(R()*H)|0,(R()*360)|0)

~function L(t) {
	c.fillStyle="#000"
	c.fillRect(0,0,W,H)
	for(i=N;i--;){
		bugs[i].move()
		bugs[i].render(t)
		bugs[i].r+=S((i+t)/50)*2
		for(j=N;j--;)
			if(i!=j && bugs[i].collidesWith(bugs[j])){
				bugs[i].move(-4)
				bugs[i].r-=10
			}
	}
	requestAnimationFrame(L);
}(0)


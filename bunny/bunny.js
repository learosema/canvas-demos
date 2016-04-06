with (Math) S=sin, C=cos, π=PI, deg=π/180, R=random, Q=sqrt
with (b.style) margin=0, overflow="hidden", backgroundColor='#222'
a.style.width = a.style.height = "100%"
this.onresize = setSize = function () {
	oldH = H
	W = a.width = innerWidth
	H = a.height = innerHeight
	if (oldH && flowers && oldH != H) {
		for(var f=flowers.length;f--;)
			with(flowers[f])y*=H/oldH,y1*=H/oldH
	}
}
RES=32
W = a.width = innerWidth
H = a.height = innerHeight
hopMode=false
hopModeTime=0

// get distance between 2 points
function distance(x1, y1, x2, y2) {
	var dx = x2 - x1, dy = y2 - y1
	return Q(dx*dx + dy*dy)|0
}

// get text image data 
function textImgData(t){
	var r=[],w,x,y,d
	c.clearRect(0,0,a.width,RES)
	
	c.font = RES+"px monospace"
	w = c.measureText(t).width
	c.fillStyle = "#fff"
	c.fillText(t, 0, RES)
	d=c.getImageData(0,0,w,RES)
	for(y=0;y<RES;y++)for(x=0;x<w;x++)r.push(d.data[x*4+y*RES*4+3]>>4)	
	return {w:w, d:r}
}

// Class Flower
function Flower(x,y,o) {
	// Flowers spawn in the center of the screen and move towards their
	// destination via Flower.prototype.move
	this.x=(W*R())|0
	this.y=(H*R())|0
	this.x1=x
	this.y1=y
	this.o=o	// opacity
}

Flower.prototype.render = function (t) {
	if (this.o<3)return
	var x = this.x, y = this.y, r = (H/(RES*2))|0, i, ri
	c.save()
	var xx = x,yy=y	
	if(hopMode){
		ht=t-hopModeTime
		xx-=ht*60
		while(xx<0)xx+=W+RES*r
		yy-=Math.abs(S(ht/2)*200)
	}
	c.translate(xx,yy)
	c.beginPath()
	c.moveTo(7/8*r+S(t)*r/4, 0)
	for(var j = 0; j < 36; j++)
		i = j * 10,
		ri = r*3/4+S(t+i*8*deg)*r*1/4,
		c.lineTo(C(i * deg) * ri, S(i * deg) * ri)
	c.fillStyle='hsl('+(((t*25+Q(x*x+y*y))%360)|0)+',100%,'+((this.o*30/6)|0)+'%)'
	c.fill()
	c.restore()
}

Flower.prototype.move = function () {
	with(this){
		if(x<x1)x+=2
		if(y<y1)y+=2
		if(x>x1)x-=2
		if(y>y1)y-=2
	}
}

Flower.prototype.hasArrived = function() {
	with(this) return (distance(x,y,x1,y1) <= 2)
}


bunny = textImgData("\uD83D\uDC07")
flowers=[]

dY=H>>5

for(y=0;y<RES;y++)for(x=0;x<bunny.w;x++)
	flowers.push(new Flower(x*32,y*dY,bunny.d[y*bunny.w+x]))

~function L(t) {
	t/=1e2
	c.fillStyle="#222"
	c.fillRect(0,0,W,H)
	hopMode=true;
	for(f=flowers.length;f--;)
		if(!flowers[f].hasArrived()){
			hopMode=false
			hopModeTime=t
			break
		}
	for(f=flowers.length;f--;){
		flowers[f].render(t)
		flowers[f].move()
	}
	/*c.fillStyle="#f0f"
	c.font="64px serif"
	c.fillText("\uD83D\uDC07",0,64) */
	requestAnimationFrame(L)
}(0)


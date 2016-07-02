walls = []
deg = Math.PI/180, sin = Math.sin, cos=Math.cos
c = a.getContext("2d")
w = a.width  = innerWidth
h = a.height = innerHeight

nX = 16
nY = 12
tW = (w/nX)|0
tH = (h/nY)|0
tWh = (tW/2)|0
tHh = (tH/2)|0
wW = tW/8

xR = -1
yR = 0
xOffs = 0
yOffs = 0
speed = 4

// random int between
R = (min, max) => (min + Math.random()*(max - min + 1))|0 

// get/set wall at position x,y
W = (x, y, v) => {
	if(x<0) x+= nX + nX*((x/-nX)|0)
	if(y<0) y+= nY + nY*((y/-nY)|0)
	if(v) walls[((y%nY)*nX + (x%nX))] = v
	return walls[((y%nY)*nX + (x%nX))]
}

// factory for a backSlashPipe \|/ :)
// param a: angle between -45° and 45°
//          -45=\, 0=|, 45=/
backSlashPipe = (a) => ({ 
	a: a||(R(0,1)*90 - 45), 
	b: (R(0,1)*90 - 45) 
})

// init world
for(let j = nY; j--;)
	for(let i = nX; i--;) 
		W(i, j, backSlashPipe())

// animation loop
~function anim(t) {
	let i,j,a,x1,y1,x2,y2,tmp;
	c.fillStyle = "#000"
	c.fillRect(0,0, w, h)
	if(xOffs%tW == 0)console.log(-((xOffs/tW)|0))
	for(j = -1; j<= nY + 1; j++)
		for(i = -1; i <= nX + 1; i++) {
			c.fillStyle = "#fff"
			a = W(i - ((xOffs/tW)|0), j - ((yOffs/tH)|0)).a
			x1 = (xOffs%tW) + i*tW + tWh + tWh*a/45
			y1 = (yOffs%tH) + j*tH
			x2 = (xOffs%tW) + i*tW + tWh - tWh*a/45
			y2 = y1 + tH
			
			c.beginPath()
			c.moveTo(x1 - wW, y1)
			c.lineTo(x1 + wW, y1)
			c.lineTo(x2 + wW, y2)
			c.lineTo(x2 - wW, y2)
			c.closePath()
			c.fill()
		}
	for(i = walls.length; i--;) {
		if(walls[i].a < walls[i].b) walls[i].a++
		if(walls[i].a > walls[i].b) walls[i].a--
	}
	for (i = speed; i--;) {
		xOffs += xR
		yOffs += yR
		if ((yR < 0 && -yOffs%tH == 0 && ((-yOffs/tH)|0)%2 == 0) ||
		    (xR < 0 && -xOffs%tW == 0 && ((-xOffs/tW)|0)%2 == 0))
			tmp = xR, xR = yR, yR = tmp
	}
	requestAnimationFrame(anim)
}(0)

// change the walls every 2.3s
setInterval(() => { 
	for(i=walls.length;i--;) 
		walls[i].b = R(0,1)*90 - 45
}, 2300)
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

// random int between
R = (min, max) => (min + Math.random()*(max - min + 1))|0 

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

for(j = nY; j--;)
	for(i = nX; i--;) 
		W(i, j, backSlashPipe())

 


xR = -1
yR = 0
step = 0


~function renderLoop(t) {
	c.fillStyle = "#000"
	c.fillRect(0,0, w, h)
	for(j = nY; j--;)
		for(i = nX; i--;) {
			c.fillStyle = "#fff"
			x1 = i*tW + tWh + tWh*W(i, j).a/45
			y1 = j*tH
			x2 = i*tW + tWh - tWh*W(i, j).a/45
			y2 = y1 + tH
			
			c.beginPath()
			c.moveTo(x1 - wW, y1)
			c.lineTo(x1 + wW, y1)
			c.lineTo(x2 + wW, y2)
			c.lineTo(x2 - wW, y2)
			c.closePath()
			c.fill()
			if(W(i, j).a < W(i, j).b) W(i, j).a++
			if(W(i, j).a > W(i, j).b) W(i, j).a--
		}
	requestAnimationFrame(renderLoop)
}(0)

setInterval(() => { 
	for(i=walls.length;i--;) 
		walls[i].b = R(0,1)*90 - 45
}, 3300)
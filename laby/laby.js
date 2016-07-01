deg = Math.PI / 180, sin = Math.sin, cos=Math.cos
c = a.getContext("2d")
w = a.width  = innerWidth / 2
h = a.height = innerHeight / 2

nX = 8
nY = 6
tW = (w / nX)|0
tH = (h / nY)|0
tWh = (tW / 2)
tHh = (tH / 2)
wW = tW / 8

// random int between
R = (min, max) => (min + Math.random()*(max - min + 1))|0 

// factory function for \/| ... a backSlashPipe :)
backSlashPipe = (x, y, a) => ({ 
	x: x, 
	y: y, 
	a: a||(R(0,1)*90 - 45), 
	a2: (R(0,1)*90 - 45) 
})


walls = []
for(j=nY; j--;)
	for(i=nX; i--;) 
		walls[j*nX + i] = backSlashPipe(i*tW, j*tH)

xR = -1
yR = 0
step = 0

~function renderLoop(t) {
	c.fillStyle="#000"
	c.fillRect(0,0, w, h)
	for(i = walls.length; i--; ) {
		c.fillStyle = "#fff"
		x1 = walls[i].x + tWh + walls[i].a/45*(tWh) 
		y1 = walls[i].y
		x2 = walls[i].x + tWh - walls[i].a/45*(tWh)
		y2 = walls[i].y + tH
		
		c.beginPath()
		c.moveTo(x1 - wW, y1)
		c.lineTo(x1 + wW, y1)
		c.lineTo(x2 + wW, y2)
		c.lineTo(x2 - wW, y2)
		c.closePath()
		c.fill()
		if(walls[i].a < walls[i].a2)walls[i].a++
		if(walls[i].a > walls[i].a2)walls[i].a--
		


	}




	requestAnimationFrame(renderLoop)
}(0)

moveRight = () => {
	xR = -1
	yR = 0
	step = 0
	for (i=nY; i--;)
		world.push(backSlashPipe(nX*tW + tW, nY*tH + i * tH))
}

setInterval(() => { 
	for(i=walls.length;i--;) 
		walls[i].a2 = R(0,1)*90 - 45
}, 3300)
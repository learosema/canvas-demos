R=Math.random
w=a.width=innerWidth
h=a.height=innerHeight
b=document.body
c=a.getContext("2d")
~function L(t){
	t*=1e-3
	c.fillStyle="#000"
	c.fillRect(0,0,w,h)
	c.save()
	c.translate(w/2,h/2)
	c.rotate(t)
	c.translate(-w/2,-h/2)
	c.lineWidth=4
	c.lineJoin = "round"
	c.strokeStyle="#fff"
	c.beginPath()
	c.moveTo(w*2/8,h/4)
	c.lineTo(w*6/8,h/4)
	c.quadraticCurveTo(w*5/8,h*3/8,w*6/8,h*4/8)
	c.quadraticCurveTo(w*7/8,h*5/8,w*6/8,h*6/8)
	c.lineTo(w*2/8,h*6/8)
	c.quadraticCurveTo(w*3/8,h*5/8,w*2/8,h*4/8)
	c.quadraticCurveTo(w*1/8,h*3/8,w*2/8,h*2/8)	
	c.stroke()
	c.restore()
	requestAnimationFrame(L)
}(0)

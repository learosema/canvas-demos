with (Math) S=sin, C=cos, π=PI, deg=π/180, R=random, Q=sqrt
with (b.style) margin=0, overflow="hidden", backgroundColor='#222'
a.style.width = a.style.height = "100%"
this.onresize = setSize = function () {
	oldH = H
	W = a.width = innerWidth
	H = a.height = innerHeight
}

W = a.width = innerWidth
H = a.height = innerHeight

// get distance between 2 points
function distance(x1, y1, x2, y2) {
	var dx = x2 - x1, dy = y2 - y1
	return Q(dx*dx + dy*dy)|0
}

~function L(t) {
	t/=1e2
	//c.fillStyle="#222"
	c.fillRect(0,0,W,H)
	/*c.fillStyle="#f0f"

	requestAnimationFrame(L)
}//(0)


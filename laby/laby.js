c = a.getContext("2d")
w = a.width  = innerWidth
h = a.height = innerHeight
X = w/10
Y = h/10

Point = (x, y) => {
	this.x = x
	this.y = y
}

Slash = (s) => {
	if(s=="/"){
		
	
	
	}
}

world = []

for(i=X*Y;i--)world[i]=Math.random()>.5?"/":"\\"



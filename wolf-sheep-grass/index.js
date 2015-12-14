// Game of Wolves, Sheeps and Grass
// (1) a blank cell which is adjacent to grass will be replaced by grass 
// (2) a grass cell which is adjacent to a sheep will be replaced by a sheep
// (3) a sheep will be replaced by a wolf if a wolf is adjacent to it. 
// (4) if a sheep has no grass adjacent to it, it will be replaced by a blank cell
// (5) if a wolf has no sheep adjacent to it, it also will be replaced by a blank cell
// (6) if a wolf has a shepherd adjacent to it, it will be replaced by a blank cell
// (7) In else cases, no replacement takes place.
R=Math.random
w=a.width=3*1280
h=a.height=3*768
W=w/64|0
H=h/64|0
for(M=[],m=W*H;m--;)M[m]=R()*4|0
M[(R()*H|0)*W+R()*W|0]=4
m=function(x,y){return y<0||x<0||x>=W||y>=H?0:M[y*W+x]}
N=function(x,y,z){
	return (m((x-1),(y-1))===z?1:0) + (m(  x  ,(y-1))===z?1:0) + (m((x+1),(y-1))===z?1:0) +
		   (m((x-1),  y  )===z?1:0)                            + (m((x+1),  y  )===z?1:0) +
		   (m((x-1),(y+1))===z?1:0) + (m(  x  ,(y+1))===z?1:0) + (m((x+1),(y+1))===z?1:0)
}
O=1 // ops per frame
P=function(x,y){
	if(m(x,y)==0&&N(x,y,1)>0)return 1 // (1)
	if(m(x,y)==1&&N(x,y,2)>0)return 2 // (2)
	if(m(x,y)==2){ // (3) && (4)
		if(N(x,y,1)==0)return 0
		if(N(x,y,3)>0)return 3
	}
	if(m(x,y)==3)if(N(x,y,2)==0||N(x,y,4)>0)return 0 // (5) && (6)
	return m(x,y) // (7)
}
E=function(u,f,i,j,k){
	for(k=j=u.length;j--;)
		i=new Image(),
		i.src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f4'+u[j]+'.png',
		i.onload=function(){if(!--k)f(u)},
		u[j]=i
}
E([11,'3a',68],function(I,i,x,y){
	G=document.createElement('canvas')
	G.width=G.height=64
	g=G.getContext('2d')
	g.fillStyle='rgba(0,255,0,0.02)'
	for(i=5e3;i--;)g.fillRect(R()*64,R()*64,4,4)
	I.splice(0,0,new Image(64,64))
	I[0].src=G.toDataURL()
	I.splice(0,0,new Image(64,64))
	~function L(x,y,i){
		c.fillStyle='rgba(51,51,51,0.9)'//d.body.style.backgroundColor
		c.fillRect(0,0,w,h)
		for(y=H;y--;)
			for(x=W;x--;)
				c.drawImage(I[m(x,y)],x*64,y*64)
		for(i=O;i--;)
			x=R()*W|0,
			y=R()*H|0,
			M[y*W+x]=P(x,y)
		requestAnimationFrame(L)	
	}()
	window.onkeydown=function(e) {
		if (e.keyCode==38)O=Math.min(O+10,1001)
		if (e.keyCode==40)O=Math.max(O-10,1)
	}
})



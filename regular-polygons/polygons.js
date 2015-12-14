R=Math.random
w=a.width=innerWidth
h=a.height=innerHeight
b=document.body
c=a.getContext("2d")
P=[]
function poly(n,r,p,v,o){
	return(o={
		n:n,p:p,v:v,r:r,
		draw:function(){
		}	
	})
}
~function L(t){
	
	requestAnimationFrame(L)
}(0)

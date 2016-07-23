c = a.getContext("2d")
w = a.width = innerWidth
h = a.height = innerHeight
X = 40
Y = 30
S = [] 

~function L(t) {
    for (y=Y;y--;)
        for(x=X;x--;);

    requestAnimationFrame(L)
}()
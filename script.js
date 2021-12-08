const mandel = (off, z) => {   
	const grad = ` .,;coxa680%&@ `;   
	let fractal = '';
	let n = 0; 

	function iterate(i, x, y, cx, cy) {
		const re = x**2 - y**2 + cx;
		const im = 2*x*y + cy;

		n = i;

		if(re**2 + im**2 > 10) return;
		if(i < 100) iterate(i += 1, re, im, cx, cy);
	}

	for(let x = -1.5; x < 1.5; x += .05) {
		for(let y = -1.5; y < 1.5; y += .025) {
			const dx = x*z + .5*off.y;
			const dy = y*z + .5*off.x;


			iterate(0, dx, dy, dx, dy);
           
           	fractal += grad[n % grad.length];
        }

        fractal += '\n';
    }

    return fractal;
}



let zoom = 1;
let prog = 0;
let offset = {x: 0, y: 0};
let step = { 
	min: 1, 
	max: 50,
	get: function(p) { return lerp(p/100, this.min, this.max) }
};



console.log(mandel(offset, 1/zoom));
window.addEventListener('keydown', ({keyCode})=> {


	if(keyCode == 40) offset.y += .25/zoom;
	if(keyCode == 38) offset.y -= .25/zoom;
	if(keyCode == 37) offset.x -= .25/zoom;
	if(keyCode == 39) offset.x += .25/zoom;


	if(keyCode == 32) {
		if(prog < 100) prog += 1;
		zoom += step.get(prog);
	}
	if(keyCode == 16) {
		if(prog > 0) prog -= 1;
		zoom -= step.get(prog);
	}


	console.log(mandel(offset, 1/zoom));
	console.log(`zoom: ${zoom}\nstep: ${step.get(prog)}`);
});



function lerp(p, a, b) {return (b - a)*p + a;}
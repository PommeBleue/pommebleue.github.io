const BACKGROUND = "#101010";
const WHITE = "#F9FBFF"
const GREEN = "#50FF50";
const YELLOW = "#FFEE8C";
const BLUE = "#A2BFFE";
const GRAY = "#BFBFBF";
const FPS = 60;
const TIME = 1000/FPS;
const ISOANGLE = Math.PI / 2;
const FACTOR = 2;
const TRANSLATE_Y_SCREEN = -250;

const MS = 1;
const ME = 1 / 1000000;
const MM = ME / 100;
const G = 4 * Math.PI**2;

//console.log(simulation);
simulation.width = 400;
simulation.height = 300;
const ctx = simulation.getContext("2d");
//console.log(ctx);

function adapt({x, y, z}){
	return {x : (1 + x) / 2, y : (1 + y) / 2, z};
}


function expand({x, y}, factor){
	return {x : x * factor, y : y * factor};
}

function isometric({x, y, z}){
	return {x : (x - y) / FACTOR, y : (0.5 * x + 0.5 * y) / FACTOR, z};
}

function clear(){
	ctx.fillStyle = BACKGROUND;
	ctx.fillRect(0, 0, simulation.width, simulation.height)	;
}

function point({x, y}, size, color, glow){
	ctx.fillStyle = color;
	ctx.beginPath();
	if (glow){
		ctx.shadowColor = YELLOW;
    	ctx.shadowBlur = size * 2;
	}
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
	ctx.shadowBlur = 0;
}

function project({x, y, z}){
	return {x : x/z, y : y/z};
}

function screen(p){
	return {x : (1 - (p.x + 1) / 2) * simulation.width, y : (1 - (p.y + 1) / 2) * simulation.height + TRANSLATE_Y_SCREEN};
}

function rotate_xz({x, y, z}, angle){
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return {
		x : x * c - z * s,
		y : y,
		z : x * s + z * c
	};
}	

function rotate_yz({x, y, z}, angle){
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return {
		x, 
		y : y * c - z * s,
		z : y * s + z * c
	};
}

function translate_z({x, y, z}, dz){
	return {x, y, z : z + dz}
}

function translate_y({x, y, z}, dy){
	return {x, y : y + dy, z}
}

function line(p1, p2){
	ctx.lineWidth = 2;
	ctx.strokeStyle = WHITE;
	ctx.beginPath();
	//console.log(p1, p2)
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}

function play(){
	setTimeout(simulate, TIME)
	setTimeout(play, TIME);
}

const vsp = [
	{x : 0, y : 0, z : 1},
	{x : 1, y : 0, z : 1},
	{x : 0, y : 1, z : 1},
	{x : 1, y : 1, z : 1},
	{x : 0, y : 0, z : 1.03},
	{x : 1, y : 0, z : 1.03},
	{x : 0, y : 1, z : 1.03},
	{x : 1, y : 1, z : 1.03},
]

const fsp = [
	[0, 1],
	[0, 2],
	[1, 3],
	[2, 3],
	// [0, 4],
	// [1, 5],
	// [2, 6],
	// [3, 7],
	// [4, 5],
	// [4, 6],
	// [5, 7],
	// [6, 7]
]


function norm({x, y, z}){
	return Math.sqrt(x * x + y * y + z * z);
}

function difference(p1, p2){
	// p1 - p2
	return {x : p1.x - p2.x,  y : p1.y - p2.y, z : p1.z - p2.z};
}

function sum(p1, p2){
	return {x : p1.x + p2.x,  y : p1.y + p2.y, z : p1.z + p2.z};
}

function scalar(lambda, {x, y, z}){
	return {x : lambda * x, y : lambda * y, z : lambda * z};
}


const dt = .005;
let first = true;
let t = 0;
let sun = {x : 0, y : 0, z : 1};
let earth =  {x : 1.0, y : 0, z : 1};
let moon = {x : 1 + 0.00257, y : 0, z : 1};
let earth_vel = {x : 0, y : 2 * Math.PI, z : 0};
let moon_vel = {x : 0, y : 2 * Math.PI + 0.2, z : 0};

function print_system(){
	const csun = screen(expand(project(translate_z(rotate_yz(isometric(adapt(sun)), ISOANGLE), 1)), FACTOR));
	const tmpearth = sum(sun, scalar(0.7, difference(earth, sun) ) )
	const cearth = screen(expand(project(translate_z(rotate_yz(isometric(adapt(tmpearth)), ISOANGLE), 1)), FACTOR));	
	const tmpmoon = sum(tmpearth, scalar(.1/norm(difference(moon, earth)), difference(moon, earth)))
	const cmoon = screen(expand(project(translate_z(rotate_yz(isometric(adapt(tmpmoon)), ISOANGLE), 1)), FACTOR));	
	point(csun, 13, YELLOW, true)
	point(cmoon, 1.5, GRAY, false)
	point(cearth, 5, BLUE, false)
}

function updatePhysics() {
        const dEx = earth.x - sun.x;
        const dEy = earth.y - sun.y;
        const distSq_E = dEx*dEx + dEy*dEy;
        const dist_E = Math.sqrt(distSq_E);

        const dMx = moon.x - sun.x;
        const dMy = moon.y - sun.y;
        const distSq_M = dMx*dMx + dMy*dMy;
        const dist_M = Math.sqrt(distSq_M);

        const dEMx = earth.x - moon.x;
        const dEMy = earth.y - moon.y;
        const distSq_EM = dEMx*dEMx + dEMy*dEMy;
        const dist_EM = Math.sqrt(distSq_EM);

        const aEx = - (G * MS * dEx) / Math.pow(dist_E, 3) 
                    - (G * MM * dEMx) / Math.pow(dist_EM, 3);
        const aEy = - (G * MS * dEy) / Math.pow(dist_E, 3) 
                    - (G * MM * dEMy) / Math.pow(dist_EM, 3);

        const aMx = - (G * MS * dMx) / Math.pow(dist_M, 3) 
                    - (G * ME * -dEMx) / Math.pow(dist_EM, 3); // Note: -(rE - rM) = (rM - rE)
        const aMy = - (G * MS * dMy) / Math.pow(dist_M, 3) 
                    - (G * ME * -dEMy) / Math.pow(dist_EM, 3);

        earth_vel.x += aEx * dt;
        earth_vel.y += aEy * dt;
        
        moon_vel.x += aMx * dt;
        moon_vel.y += aMy * dt;

        earth.x += earth_vel.x * dt;
        earth.y += earth_vel.y * dt;
        
        moon.x += moon_vel.x * dt;
        moon.y += moon_vel.y * dt;
    }

function simulate(){
	clear();
	for (const f of fsp){
		for (let i = 0; i < f.length - 1; ++i){
			const a = screen(expand(project(translate_z(rotate_yz(isometric(vsp[f[i]]), ISOANGLE), 1)), FACTOR));	
			const b = screen(expand(project(translate_z(rotate_yz(isometric(vsp[f[i + 1]]), ISOANGLE), 1)), FACTOR));
			if (first) {
				//console.log(a, b);
			}
			line(a, b);
		}
	}
	print_system();
	if (check.checked == true){
		updatePhysics();
	}
	//console.log('earth', earth.x, earth.y, earth.z)
	first = false;
}

setTimeout(play, TIME)
const FRAME_DURATION = 1000/60; // fps
const getTime = typeof performance === 'function' ? performance.now : Date.now;

const scoreField = document.getElementById("score");

const canvas = document.getElementById("gameCanvas");
const W = canvas.width;
const H = canvas.height;
const ctx = canvas.getContext("2d");

// Pixel ratio
const pixel = 16;

// Calculate one virtual pixel size
function pix(x = 0) {
	return x*pixel;
}

// Clear screen with chosen color
function clearScreen(color = "white") {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, W, H);
	ctx.fill();
}

let snake = new Snake(pix(7), pix(7), pixel, W, H);
let candy = new Candy(pixel, W, H);


// Listen for arrow key input and change direction if pressed
document.body.addEventListener("keydown", (e) => {
	if (e.keyCode == 38 && (snake.dir != 40 || snake.body.length == 1)) {
		// Pressed arrow up key
		snake.changeDirection(38);
	}
	if (e.keyCode == 40 && (snake.dir != 38 || snake.body.length == 1)) {
		// Pressed arrow down key
		snake.changeDirection(40);
	}
	if (e.keyCode == 37 && (snake.dir != 39 || snake.body.length == 1)) {
		// Pressed arrow left key
		snake.changeDirection(37);
	}
	if (e.keyCode == 39 && (snake.dir != 37 || snake.body.length == 1)) {
		// Pressed arrow right key
		snake.changeDirection(39);
	}
});
function animate() {

	clearScreen("#474747");
	candy.draw(ctx);
	snake.draw(ctx);
	scoreField.innerHTML = "Score: " + snake.score;

	if (snake.body[0].x == candy.x && snake.body[0].y == candy.y) {
		snake.eat();
		candy.generate();
	}
	snake.update();


	setTimeout(animate, 100)
}

animate();
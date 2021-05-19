class Rect {
	constructor (x, y, pixel) {
		this.x = x;
		this.y = y;
		this.pixel = pixel;
		this.color = "#4C9900";
	}
	draw (ctx) {
		// Draw simple rectangle at direct coordinates
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.pixel, this.pixel);
		ctx.fill();
	}
}
class Snake {
	constructor(x, y, pixel, w, h) {
		// Snakes color
		this.color = "#4C9900";
		this.pixel = pixel;

		// Head element
		this.body = [new Rect(x, y, pixel)];
		
		this.velocity = {
			x: pixel,
			y: 0
		}
		this.dir = 39;
		this.game = {
			width: w,
			height: h
		}
		this.score = 0;
	}

	eat() {
		// When the snakes head position is equal to candy position,
		// then push new element into the body array with position of
		// arrays last elements position 
		let x = this.body[this.body.length-1].x;
		let y = this.body[this.body.length-1].y;

		this.body.push(new Rect(x, y, pixel));
		this.score++;
	}

	changeDirection(dir) {
		// Depending on key code change moving direction of the snakes
		// head or this.body[0] element
		switch(dir) {
			case 38: // Up
				this.velocity.x = 0;
				this.velocity.y = -pixel;
				this.dir = 38;
				break;
			case 40: // Down
				this.velocity.x = 0;
				this.velocity.y = pixel;
				this.dir = 40;
				break;
			case 37: // Left
				this.velocity.x = -pixel;
				this.velocity.y = 0;
				this.dir = 37;
				break;
			case 39: // Right
				this.velocity.x = pixel;
				this.velocity.y = 0;
				this.dir = 39;
				break;
		}
	}

	wallCollision() {
		// Check whether the snake has hit one of the walls
		if (this.body[0].x < 0) {
			return true;
		}
		if (this.body[0].x + pixel > this.game.width) {
			return true;
		}
		if (this.body[0].y < 0) {
			return true;
		}
		if (this.body[0].y + pixel > this.game.height) {
			return true;
		}
		return false;
	}

	selfCollision() {
		// Check whether the snake has hit himself
		if (this.body.length <= 2) return false;
		for (let i = 1; i < this.body.length; i++) {
			if (this.body[i].x == this.body[0].x &&
			    this.body[i].y == this.body[0].y) {
				return true;		
			}
		}
		return false;
	}


	draw(ctx) {
		// Draw all the parts of snake
		for (let i = 0; i < this.body.length; i++) {
			this.body[i].draw(ctx);
		}
	}

	update() {
		// Check for collisions
		if (this.wallCollision() || this.selfCollision()) {
			this.velocity = {x:0, y:0};
			return;
		}

		// Update the entire sankes position
		for (let i = this.body.length-1; i >= 1; i--) {
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		this.body[0].x += this.velocity.x;
		this.body[0].y += this.velocity.y;
	}
}

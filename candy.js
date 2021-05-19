class Candy {
	constructor (pixel, width, height){
		this.pixel = pixel;
		this.game = {
			width: width,
			height: height
		};
		// Similar to generate() method
		this.x = Math.floor(Math.random()*(this.game.width/this.pixel))*this.pixel;
		this.y = Math.floor(Math.random()*(this.game.height/this.pixel))*this.pixel;

		// Candy color
		this.color = "#FF0000";
	}
	generate() {
		// Generates new candy position including the pixel size
		this.x = Math.floor(Math.random()*(this.game.width/this.pixel))*this.pixel;
		this.y = Math.floor(Math.random()*(this.game.height/this.pixel))*this.pixel;
	}
	draw (ctx) {
		// Draws simple rectangle or candy
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, pixel, pixel);
		ctx.fill();
	}
}
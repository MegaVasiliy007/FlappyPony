const cvs = document.getElementById("canvas"), ctx = cvs.getContext("2d"), clouds = [],
	images = {pony: new Image(), bg: new Image(), cloud: new Image()},
	data = {score: 0, posY: 150, posX: 50, gravy: 0.07, speed: 0, step: 0, gap: 100, anim: 0, animSpeed: 4, flag: 1};

clouds[0] = {x: Math.round(cvs.width * 0.6) + 1, y: -250};

images.pony.src = 'img/animPony.png';
images.bg.src = 'img/background.png';
images.cloud.src = 'img/cloud.png';

document.addEventListener("keydown", function (e) {
	if (e.code === 'BracketLeft') data.animSpeed++;
	else if (e.code === 'BracketRight') data.animSpeed--;
	else moveUp();
});
document.addEventListener("click", () => moveUp());

function moveUp() {if (data.speed >= -2) data.speed -= 1.5}

function draw() {
	for (let i = 0, width = cvs.width; i < width - data.step; i += 256)
		ctx.drawImage(images.bg, i + data.step, 0);
	data.step -= 0.3;
	if (data.step >= 256) data.step = 0;

	for (let i = 0, length = clouds.length; i < length; i++) {
		ctx.drawImage(images.cloud, clouds[i].x, clouds[i].y);
		ctx.drawImage(images.cloud, clouds[i].x, clouds[i].y + images.cloud.height + data.gap);
		clouds[i].x--;

		if (clouds[i].x === Math.round(cvs.width * 0.60))
			clouds.push({x: cvs.width, y: Math.random() * images.cloud.height - images.cloud.height - 50});

		if (data.posX + 42 >= clouds[i].x && data.posX <= clouds[i].x + images.cloud.width
			&& (data.posY <= clouds[i].y + images.cloud.height
				|| data.posY + images.pony.height >= clouds[i].y + images.cloud.height + data.gap)
			|| data.posY + images.pony.height >= cvs.height) {
			if (data.flag) location.reload();
			data.flag = 0;
		}

		if (clouds[i].x === 0) data.score++;
	}

	if (data.speed < 2) data.speed += data.gravy;
	data.posY += data.speed;
	if (data.anim > (data.animSpeed - 1) * 10) data.anim = 0;
	ctx.drawImage(images.pony, Math.round(data.anim / data.animSpeed) * 42, 0, 42, images.pony.height, data.posX, data.posY, 42, images.pony.height);
	data.anim++;

	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + data.score, 10, cvs.height - 10);

	requestAnimationFrame(draw);
}

draw();
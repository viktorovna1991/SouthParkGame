// SELECT CVS
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");
ctx.scale(1,1);

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// GAME VARS AND CONSTS
let frames = 0;

// LOAD SPRITE IMAGE
const clouds = new Image();
clouds.src = "images/clouds.jpg";

const background = new Image();
background.src = "images/bg.png";

// // BACKGROUND
// bg = {
//     sX: 0,
//     sY: 0,
//     w: 1366,
//     h: 768,
//     x: 0,
//     y: 0,
//
//     draw: function () {
//         ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 0.17, this.h * 0.17);
//     }
//
// };


// DRAW
function draw() {
    // ctx.fillStyle = "#70c5ce";
    // ctx.fillRect(0, 0, cvs.width, cvs.height);

    // bg.draw();
}

// UPDATE
function update() {

}


// LOOP
function loop() {
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();

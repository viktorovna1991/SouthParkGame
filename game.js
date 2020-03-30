// SELECT CVS
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// GAME VARS AND CONSTS
let frames = 0;

// LOAD SPRITE IMAGE
const clouds = new Image();
clouds.src = "images/clouds.jpg";

var wrapper = document.getElementById("wrapper");
var background = document.createElement('img');
var additionalBackground = document.createElement('img');
var width = document.body.clientWidth;


// BACKGROUND
bg = {

    x: 0,
    dx: 1,

    draw: function () {
        background.src = "images/bg.png";
        background.style.position = "absolute";
        background.style.width = "1366px";
        background.style.bottom = "0";
        background.style.left = this.x + 'px';
        wrapper.appendChild(background);
        if (width >= background.clientWidth) {
            additionalBackground.src = "images/bg.png";
            additionalBackground.style.position = "absolute";
            additionalBackground.style.width = "1366px";
            additionalBackground.style.bottom = "0";
            additionalBackground.style.left = (background.clientWidth + this.x) + 'px';
            wrapper.appendChild(additionalBackground);
        }
    },

    update: function () {
        this.x = (this.x - this.dx)%1365;
        console.log('x', this.x);


    }
};

// DRAW
function draw() {
    bg.draw();
}

// UPDATE
function update() {
    bg.update();
}

// LOOP
function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();

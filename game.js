// SELECT CVS
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

var ct = setupCanvas(document.getElementById('game'));


// GAME VARS AND CONSTS
let frames = 0;

// LOAD SPRITE IMAGE
const clouds = new Image();
clouds.src = "images/clouds.jpg";

const cartmans = new Image();
cartmans.src = "images/cartman.png";

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
        this.x = (this.x - this.dx) % 1365;
    }
};

// CARTMAN
const cartman = {
    animation: [
        {sX: 461, sY: 54},
        {sX: 276, sY: 139},
        {sX: 276, sY: 164},
        {sX: 276, sY: 139}
    ],
    x: 150,
    y: 450,
    w: 133,
    h: 174,
    dw: 133,
    dh: 174,

    frame: 0,

    draw: function () {
        let cartman = this.animation[this.frame];

        ctx.drawImage(cartmans, cartman.sX, cartman.sY, this.w, this.h, parseInt(this.x)+ 0.5, parseInt(this.y)+ 0.5, this.dw, this.dh);
    },

};

// DRAW
function draw() {
    bg.draw();
    cartman.draw();
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

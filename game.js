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
let frameCount = 0;

// LOAD SPRITE IMAGE
const clouds = new Image();
clouds.src = "images/clouds.jpg";

const cartmans = new Image();
cartmans.src = "images/cartman.png";

var wrapper = document.getElementById("wrapper");
var background = document.createElement('img');
var additionalBackground = document.createElement('img');
var homelessness = document.createElement('img');
var width = document.body.clientWidth;

// BACKGROUND
bg = {

    x: 0,
    dx: 3,

    draw: function () {
        background.src = "images/bg.png";
        background.style.position = "absolute";
        background.style.width = "1366px";
        background.style.bottom = "0";
        background.style.left = this.x + 'px';
        wrapper.appendChild(background);
        additionalBackground.src = "images/bg.png";
        additionalBackground.style.position = "absolute";
        additionalBackground.style.width = "1366px";
        additionalBackground.style.bottom = "0";
        additionalBackground.style.left = (background.clientWidth + this.x) + 'px';
        wrapper.appendChild(additionalBackground);
    },

    update: function () {
        this.x = (this.x - this.dx) % 1365;
    }
};

//CARTMAN
const cartman = {
    animation: [
        {sX: 617, sY: 55},
        {sX: 762, sY: 56},
        {sX: 21, sY: 295},
        {sX: 180, sY: 295},
    ],
    x: 150,
    y: 450,
    w: 133,
    h: 174,

    frame: 0,

    draw: function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        let cartman = this.animation[this.frame];
        ctx.drawImage(cartmans, cartman.sX, cartman.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },

    update: function () {
        this.period = 7;
        this.frame = frameCount % this.period === 0 ? 1 : this.frame + 1;
        this.frame = this.frame % this.animation.length;
    }

};

// HOMELESS
const homeless = {
    position: [],
    dx: 4,
    w: 297,

    draw: function () {

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            homelessness.src = "images/homeless.png";
            homelessness.style.position = "absolute";
            homelessness.style.width = "297px";
            homelessness.style.bottom = p.y + 'px';
            homelessness.style.left = p.x + 'px';
            wrapper.appendChild(homelessness);
        }
    },

    update: function () {

        if (frames % 500 === 0) {
            this.position.push({
                x: cvs.width,
                y: 20,
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            // if the pipes go beyond canvas, we delete them from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
            }
        }
    },

    reset: function () {
        this.position = [];
    }

};

// DRAW
function draw() {
    bg.draw();
    homeless.draw();
}

// UPDATE
function update() {
    bg.update();
    homeless.update();
}

function loop2() {
    if (frameCount < 15) {
        requestAnimationFrame(loop2);
        return;
    }
    if (frameCount === 16) {
        frameCount = 0;
        return;
    }
    cartman.draw();
    cartman.update();

}

// LOOP
function loop() {

    update();
    draw();
    frames++;
    frameCount++;

    requestAnimationFrame(loop);
    loop2();

}

loop();



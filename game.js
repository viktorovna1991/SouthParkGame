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

// LOAD SOUNDS
const HIT_S = new Audio();
HIT_S.src = "sounds/sp_hey.wav";

const JUMP_S = new Audio();
JUMP_S.src = "sounds/sp_jump.mp3";

const SKATING_S = new Audio();
SKATING_S.src = "sounds/sp_skating.mp3";

// LOAD SPRITE IMAGE
const cartmans = new Image();
cartmans.src = "images/cartman.png";

const wastedFon = new Image();
wastedFon.src = "images/death.png";

const startButton = new Image();
startButton.src = "images/press.png";

const finishButton = new Image();
finishButton.src = "images/button1.png";

var wrapper = document.getElementById("wrapper");
var background = document.createElement('img');
var additionalBackground = document.createElement('img');
var homelessness = document.createElement('img');


// GAME STATE
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
};

// GAME OVER FON
const deathFon = {
    sX: 0,
    sY: 0,
    w: 1366,
    h: 768,
    x: 0,
    y: 0,

    draw: function () {
        if (state.current === state.over) {
            ctx.drawImage(wastedFon, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

};

// START BUTTON COORD
const startBtn = {
    x: cvs.width / 2 - 102,
    y: cvs.offsetHeight / 2 - 43,
    w: 205,
    h: 87
};

var count = 0;
// CONTROL THE GAME
cvs.addEventListener("click", function (evt) {

    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            SKATING_S.play();
            break;
        case state.game:
            count = 1;
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;

            // CHECK IF WE CLICK ON THE START BUTTON
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >=
                startBtn.y && clickY <= startBtn.y + startBtn.h) {
                homeless.reset();
                cartman.speedReset();
                state.current = state.getReady;
            }
            break;
    }
});

// BACKGROUND
bg = {

    x: 0,
    dx: 6,

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
        if (state.current === state.game) {
            this.x = (this.x - this.dx) % 1365;
        }
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

    jump: 3,

    speed: 0,

    frame: 0,
    animationJump: [
        {sX: 1, sY: 49},
        {sX: 155, sY: 0},
    ],
    frameJump: 0,

    drawJump: function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        let cartmanScate = this.animationJump[this.frameJump];
        ctx.drawImage(cartmans, cartmanScate.sX, cartmanScate.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },

    updateJump: function () {
        if (this.y > 250 && this.frameJump === 0) {
            JUMP_S.play();
            for (let i = 5; i > 0; i--) {
                this.y -= this.jump * i * 0.2;
            }

        }
        if (this.y <= 250) {
            this.frameJump = 1;
            this.y += this.jump;
        }
        if (this.frameJump === 1) {
            for (let i = 0; i < 5; i++) {
                this.y += this.jump * i * 0.2;
            }

        }
        if (this.frameJump === 1 && this.y >= 450) {
            count = 0;
            this.frameJump = 0;
        }
    },

    draw: function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        let cartman = this.animation[this.frame];
        ctx.drawImage(cartmans, cartman.sX, cartman.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    },

    update: function () {
        this.period = 7;
        this.frame = frameCount % this.period === 0 ? 1 : this.frame + 1;
        this.frame = this.frame % this.animation.length;
    },

    speedReset: function () {
        this.gravity = 0;
    }

};

// HOMELESS
const homeless = {
    position: [],
    dx: 6,
    w: 297,
    h: 131,

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
        if (state.current !== state.game) return;
        if (frames % 500 === 0) {
            this.position.push({
                x: cvs.width,
                y: 20,
            });
        }
        let m = [267, 266, 265, 264, 263, 262, 261, 260, 259];

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            // BOTTOM HOMELESS
            if ((m.includes(p.x)) && (cartman.y === 450)) {
                HIT_S.play();
                state.current = state.over;
            }

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

// GET READY MESSAGE
const getReady = {
    sX: 0,
    sY: 0,
    w: 662,
    h: 481,
    x: cvs.width / 2 - 173 / 2,
    y: 200,

    draw: function () {
        if (state.current === state.getReady) {
            ctx.drawImage(startButton, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

};
console.log('w', window.innerWidth);
console.log('h', window.innerHeight);

// GAME OVER MESSAGE
const gameOver = {
    sX: 0,
    sY: 0,
    w: 205,
    h: 87,
    x: window.innerWidth / 2 - 102,
    y: window.innerHeight / 2 - 43,

    draw: function () {
        if (state.current === state.over) {
            ctx.drawImage(finishButton, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
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
    if (count === 0) {
        cartman.draw();
        if (state.current === state.game) {
            cartman.update();
        }
    }
    if (state.current === state.over) {
        deathFon.draw();
    }
    getReady.draw();
    gameOver.draw();

}

// LOOP
function loop() {
    update();
    draw();
    frames++;
    frameCount++;
    if (count === 1) {
        cartman.drawJump();
        cartman.updateJump();
    }

    requestAnimationFrame(loop);
    loop2();

}

loop();



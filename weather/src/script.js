import { getPArray } from "./main.js";

let pArray = await getPArray();
console.log(pArray);
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// Canvas settings
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;

class RainParticle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * 16 + 1);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 6 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLegnth = Math.floor(Math.random() * 10 + 5);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * 1.5 + 0.01;
        this.timer = this.maxLegnth * 15;
        this.colors = ['#2227ab', '#2a2ebd', '#131aeb', '#4046ed', '#252773', '#0c1085', '#0f126b']
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }

    update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;

            if (this.effect.flowField[index]) {
                this.newAngle = this.effect.flowField[index].colorAngle;
                if (this.angle > this.newAngle) {
                    this.angle -= this.angleCorrector;
                } else if (this.angle < this.newAngle) {
                    this.angle += this.angleCorrector;
                } else {
                    this.angle = this.newAngle;
                }
            }
            this.x -= Math.cos(this.angle) * Math.floor(Math.random() * 2 + 1);
            this.y += 1 * this.speedModifier;

            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLegnth) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }

    }

    reset() {
        this.x = Math.random() * this.effect.width;
        this.y = Math.floor(Math.random() * 15 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLegnth * 15;

    }
}








class CloudParticle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * 500 + 1);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 6 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLegnth = Math.floor(Math.random() * 10 + 5);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * 0.5 + 0.01;
        this.timer = this.maxLegnth * 15;
        this.colors = ['#605f63', '#d2cede']
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }

    update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;

            if (this.effect.flowField[index]) {
                this.newAngle = this.effect.flowField[index].colorAngle;
                if (this.angle > this.newAngle) {
                    this.angle -= this.angleCorrector;
                } else if (this.angle < this.newAngle) {
                    this.angle += this.angleCorrector;
                } else {
                    this.angle = this.newAngle;
                }
            }
            this.x += Math.cos(this.angle) * Math.floor(Math.random() * 2 + 1);
            this.y += Math.cos(this.angle) * Math.floor(Math.random() * 1.5 + 0.01);

            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLegnth) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }

    }

    reset() {
        this.x = Math.random() * this.effect.width;
        this.y = Math.floor(Math.random() * 15 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLegnth * 15;

    }
}




class SunParticle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * (this.effect.width - 500) + 1);
        this.y = Math.floor(Math.random() * 500 + 1);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 6 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLegnth = Math.floor(Math.random() * 10 + 5);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * 0.3 + 0.01;
        this.timer = this.maxLegnth * 15;
        this.colors = ['#fcde1c', '#f5d611', '#f5d611']
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }

    update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;

            if (this.effect.flowField[index]) {
                this.newAngle = this.effect.flowField[index].colorAngle;
                if (this.angle > this.newAngle) {
                    this.angle -= this.angleCorrector;
                } else if (this.angle < this.newAngle) {
                    this.angle += this.angleCorrector;
                } else {
                    this.angle = this.newAngle;
                }
            }
            this.x -= Math.cos(this.angle) * Math.floor(Math.random() * 1.5 + 0.5);
            this.y += Math.cos(this.angle) * Math.floor(Math.random() * 1.5 + 0.01);

            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLegnth) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }

    }

    reset() {
        this.x = Math.random() * this.effect.width + (this.effect.width - 50);
        this.y = Math.floor(Math.random() * 15 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLegnth * 10;

    }
}





class GrassParticle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * 500 + 1);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 6 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLegnth = Math.floor(Math.random() * 10 + 5);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * 0.5 + 0.01;
        this.timer = this.maxLegnth * 15;
        this.colors = ['#17d40d', '#2dd624', '#31f527', '#13b50b'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }

    update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;

            if (this.effect.flowField[index]) {
                this.newAngle = this.effect.flowField[index].colorAngle;
                if (this.angle > this.newAngle) {
                    this.angle -= this.angleCorrector;
                } else if (this.angle < this.newAngle) {
                    this.angle += this.angleCorrector;
                } else {
                    this.angle = this.newAngle;
                }
            }
            this.x += Math.cos(this.angle) * Math.floor(Math.random() * 0.5 + 0.1);
            this.y -= Math.cos(this.angle) * Math.floor(Math.random() * 3 + 0.5);

            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLegnth) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }

    }

    reset() {
        this.x = Math.random() * this.effect.width;
        this.y = Math.floor(Math.random() * this.effect.height + (this.effect.height - 5));
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLegnth * 5;

    }
}









class Effect {
    constructor(canvas, ctx, pArr) {
        this.canvas = canvas;
        this.arr = pArr;
        console.log("indeni: " + this.arr);
        this.context = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numberOfParticles = 1000;
        this.cellSize = 2;
        this.rows;
        this.cols;
        this.flowField = [];
        this.curve = 5;
        this.zoom = 0.07;
        this.debug = false;
        this.init();

        window.addEventListener('keydown', e => {
            console.log(e);
            if (e.key === 'd') this.debug = !this.debug;
        });

        window.addEventListener('resize', e => {
            this.resize(e.target.innerWidth, e.target.innerHeight);
        })
    }

    init() {
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        // scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data;
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                const index = (y * this.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const grayscale = (red + green + blue) / 3;
                const colorAngle = ((grayscale / 255) * 6.28).toFixed(2);
                this.flowField.push({
                    x: x,
                    y: y,
                    alpha: alpha,
                    colorAngle: colorAngle
                });
            }
        }


        /*for(let y = 0; y < this.rows; y++){
            for(let x = 0; x < this.cols; x++){
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle);
            }
        }*/

        // create particles
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles / 4; i++) {
            if (this.arr[0] == true) {
                this.particles.push(new RainParticle(this));
            }
            if (this.arr[1] == true) {
                this.particles.push(new CloudParticle(this));
            }
            if (this.arr[2] == true) {
                this.particles.push(new SunParticle(this));
            }
            if (this.arr[3] == true) {
                this.particles.push(new GrassParticle(this));
            }
        }

        this.particles.forEach(particle => particle.reset());
    }

    drawGrid() {
        this.context.save();
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 0.3;
        for (let c = 0; c < this.cols; c++) {
            this.context.beginPath();
            this.context.moveTo(this.cellSize * c, 0);
            this.context.lineTo(this.cellSize * c, this.height);
            this.context.stroke();
        }

        for (let r = 0; r < this.rows; r++) {
            this.context.beginPath();
            this.context.moveTo(0, this.cellSize * r);
            this.context.lineTo(this.width, this.cellSize * r);
            this.context.stroke();
        }
        this.context.restore();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }

    render() {
        if (this.debug) {
            this.drawGrid();
        }
        this.particles.forEach(particle => {
            particle.draw(this.context);
            particle.update();
        })
    }
}



const effect = new Effect(canvas, ctx, pArray);


function animate(particleArray) {
    ctx.clearRect(0, 0, canvas.width, canvas.height, particleArray);
    effect.render();
    requestAnimationFrame(animate);
}
animate(pArray);
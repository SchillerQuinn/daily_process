var max_speed = 4;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate = 2;
var max_particles = 100;
var all_particles = new particleSystem();
var button;

function setup() {
    var canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
      );
    canvas.parent("sketch");
    background(0);

    // button = createButton('click me');
    // // put button in same container as the canvas
    // button.parent("sketch");
    // // by default this sets position relative to window...
    // button.position(0, 0);

}

function draw() {
    all_particles.update();
}

function mouseDragged() {
    if (all_particles.count < max_particles) {
        all_particles.addParticle(createVector(mouseX, mouseY));
    }
}

function particleSystem() {
    this.count = 0;
    this.wanderers = [];

    this.addParticle = function(location) {
        this.count++;
        append(this.wanderers, new Particle(location));
    };

    this.update = function() {
        for(var i=0; i < this.wanderers.length; i++) {
            this.wanderers[i].update();
            if (this.wanderers[i].isDead()) {
                this.wanderers.splice(i, 1);
                this.count--;
            }
            else {
                this.wanderers[i].display();
            }

        }
    };
}

class Particle {
    constructor(location) {
        this.location = createVector(location.x, location.y);
        this.size = 100;
        this.velocity = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0.0

        this.color = new colorGenerator();
    }

    update() {
        this.angle += random(0, TWO_PI);
        var magnitude = random(0, 4);

        this.acc.x += cos(this.angle) * magnitude;
        this.acc.y += sin(this.angle) * magnitude;
        this.acc.limit(3);

        this.velocity.add(this.acc);
        this.velocity.limit(6);

        this.location.add(this.velocity);

        this.size -= shrink_rate;
    }

    display() {
        this.color.update();
        fill(this.color.R, this.color.G, this.color.B);
        stroke(0, 125);
        ellipse(this.location.x, this.location.y, this.size);
    }

    isDead() {
        if (this.size < 6) {
            return true;
        }
        else {
            return false;
        }
    }
}

class colorGenerator {
    constructor() {
        this.min_speed = 0.2;
        this.max_speed = 0.7;
        this.R = random(255);
        this.G = random(255);
        this.B = random(255);

        this.Rspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
        this.Gspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
        this.Bspeed = (random(1) > 0.5 ? 1 : -1) * random(this.min_speed, this.max_speed);
    }

    update() {
        this.Rspeed = ((this.R += this.Rspeed) > 255 || (this.R < 0)) ? -this.Rspeed : this.Rspeed;
        this.Gspeed = ((this.G += this.Gspeed) > 255 || (this.G < 0)) ? -this.Gspeed : this.Gspeed;
        this.Bspeed = ((this.B += this.Bspeed) > 255 || (this.B < 0)) ? -this.Bspeed : this.Bspeed;
    }
}
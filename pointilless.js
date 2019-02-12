var max_speed = 4;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate = 2;
var max_particles = 100;
var all_particles = new particleSystem();
var button;

let img;
let imgDict

function preload() {
  img = loadImage('Sarina.jpg');
}


function setup() {
  var canvas = createCanvas(
    1280,
    1232
  );
  canvas.parent("sketch");
  background(0);
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
  imgDict = img.get()

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
    for (var i = 0; i < this.wanderers.length; i++) {
      this.wanderers[i].update();
      if (this.wanderers[i].isDead()) {
        this.wanderers.splice(i, 1);
        this.count--;
      } else {
        this.wanderers[i].display();
      }

    }
  };
}

class Particle {
  constructor(location) {
    this.location = createVector(location.x, location.y);
    this.size = 1;
    this.velocity = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.angle = 0.0

    this.color = new colorGenerator(this.location);
  }

  update(location) {
    this.angle += random(0, TWO_PI);
    var magnitude = random(0, 4);
    this.acc.x += cos(this.angle) * magnitude;
    this.acc.y += sin(this.angle) * magnitude;
    this.acc.limit(3);
    this.velocity.add(this.acc);
    this.velocity.limit(6);
    this.location.add(this.velocity);
    this.size += shrink_rate;
  }

  display() {
    this.color.update(this.location)
    fill(this.color.R, this.color.G, this.color.B, 255 - this.size * 5);
    noStroke();
    ellipse(this.location.x, this.location.y, this.size);
  }

  isDead() {
    if (this.size > 50) {
      return true;
    } else {
      return false;
    }
  }
}

class colorGenerator {
  constructor(loc) {
    console.log(loc)
    this.R = red(img.get(loc.x, loc.y))
    this.G = green(img.get(loc, loc.y))
    this.B = blue(img.get(loc.x, loc.y))
    }

    update(loc) {
      console.log(loc)
      this.R = red(img.get(loc.x, loc.y))
      this.G = green(img.get(loc.x, loc.y))
      this.B = blue(img.get(loc.x, loc.y))
    }
  }

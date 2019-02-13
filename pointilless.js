var max_speed = 3;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate
var max_particles = 100;
var all_particles = new particleSystem();
var button;
let scale;

let imgg,       //imag     //resized image of the image (visible)
    imageRatio;     //ratio of the image h/w

function preload() {
    imgNum = floor(random(1,33))
    console.log(imgNum)
    imgg=loadImage(imgNum+".jpg");
}


function setup() {
  scale =min(windowHeight/ imgg.height, windowWidth/ imgg.width)
  shrink_rate = min(windowHeight/300, windowWidth/300);
  console.log(scale)
  canvas = createCanvas(imgg.width*scale, imgg.height*scale);
  canvas.parent("sketch");
  background(0);
  imageMode(CENTER);
  noStroke();
  background(255);
  imgg.loadPixels();
  //let all_particles = new particleSystem();

  // button = createButton('click me');
  // // put button in same container as the canvas
  // button.parent("sketch");
  // // by default this sets position relative to window...
  // button.position(0, 0);

}
function draw() {
  //all_particles = new particleSystem();
  all_particles.update();
}

function mousePressed() {
  if (all_particles.count < max_particles) {
    all_particles.addParticle(createVector(mouseX, mouseY));
  }
}

function mouseMoved() {
  if (all_particles.count < max_particles) {
    all_particles.addParticle(createVector(mouseX, mouseY));
  }
}


function deviceShaken() {
  if (all_particles.count < max_particles) {
  all_particles.addParticle(createVector(random(0,imgg.width*scale), random(0,imgg.height*scale)));
  all_particles.addParticle(createVector(random(0,imgg.width*scale), random(0,imgg.height*scale)));
  all_particles.addParticle(createVector(random(0,imgg.width*scale), random(0,imgg.height*scale)));
  all_particles.addParticle(createVector(random(0,imgg.width*scale), random(0,imgg.height*scale)));
  all_particles.addParticle(createVector(random(0,imgg.width*scale), random(0,imgg.height*scale)));
 }
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
    this.size = min(windowHeight/20, windowWidth/20);
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
    this.size = this.size*0.9-0.01
  }

  display() {
    this.color.update(this.location)
    fill(this.color.R, this.color.G, this.color.B, 255-255*(this.size/min(windowHeight/20, windowWidth/20)));
    //fill(this.color.R, this.color.G, this.color.B, 255-this.size*3);
        this.x1 = this.location.x+Math.cos(this.angle+(2*Math.PI/3))*this.size/2
        this.y1 = this.location.y+Math.sin(this.angle+(2*Math.PI/3))*this.size/2
        this.x2 = this.location.x+Math.cos(this.angle+2*(2*Math.PI/3))*this.size/2
        this.y2 = this.location.y+Math.sin(this.angle+2*(2*Math.PI/3))*this.size/2
        this.x3 = this.location.x+Math.cos(this.angle)*this.size
        this.y3 = this.location.y+Math.sin(this.angle)*this.size
        noStroke();
        //rotate(this.angle)
        triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)

  }

  isDead() {
    if (this.size < 0 ) {
      return true;
    } else {
      return false;
    }
  }
}

class colorGenerator {
  constructor(loc) {
    this.R = red(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
    this.G = green(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
    this.B = blue(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
    }

    update(loc) {
      this.R = red(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
      this.G = green(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
      this.B = blue(imgg.get(floor(loc.x/scale), floor(loc.y/scale)))
    }
  }

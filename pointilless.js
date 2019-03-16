var max_speed = 3;
var bounce = -0.5;
var life_dec = 2.0;
var shrink_rate
var max_particles = 100;
var all_particles = new particleSystem();
var button;
let scale;
let xOffset;
let yOffset;

let imgg, //imag     //resized image of the image (visible)
  imageRatio; //ratio of the image h/w
let small = false;
let grid = false;
let big = false;
let filll = false;
let sat = true;
let alphaa = false;
var K = 0.1;
let A = 100;
let colorfuckery = false;
var done = [];
let lastSortLength = 0;
let canvas

var x = Array(31).fill().map((_, i) => i);
var y = Array(31).fill().map((_, i) => i);

let combos = [] //or combos = new Array(2);

for (var i = 0; i < x.length; i++) {
  for (var j = 0; j < y.length; j++) {
    combos.push([x[i], y[j]])
  }
}

var shuffle = function(array) {

  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};
combos = shuffle(combos)


function preload() {
  //imgNum = floor(random(1,32))
  //imgg=loadImage(imgNum+".jpg");
  imgg = loadImage('Enzo.jpg')
}

function setup() {
  fullscreen(true)
  smooth()
  scale =min(windowHeight/ imgg.height, windowWidth/ imgg.width)
  //scale = 5
  shrink_rate = min(windowHeight / 300, windowWidth / 300);
  canvas = createCanvas(imgg.width * scale, imgg.height * scale, WEBGL);
  //canvas.parent("sketch");
  pixelDensity(3)
  xOffset = width / 2
  yOffset = height / 2
  ortho();
  //orbitControl();
  //normalMaterial();
  imageMode(CORNERS);
  noStroke();
  //stroke('#222222');
  imgg.loadPixels();
  //image(imgg, 0, 0);
  //background(0);

  //let all_particles = new particleSystem();

  // button = createButton('click me');
  // // put button in same container as the canvas
  // button.parent("sketch");
  // // by default this sets position relative to window...
  // button.position(0, 0);

}

function draw() {
  //all_particles = new particleSystem();

  let locX = mouseX - (height / 2);
  let locY = mouseY - (width / 2);
  ambientLight(100, 100, 100);
  pointLight(250, 250, 250, locX, locY, 5);

  if (mouseIsPressed) {
    if (all_particles.count < max_particles) {
      all_particles.addParticle(createVector(mouseX - xOffset, mouseY - yOffset));
    }
  }
  if (filll) {
    if (all_particles.count < max_particles) {
      if (grid) {
        try {
          var locc = combos.pop()
          all_particles.addParticle(createVector(locc[0] / 30 * imgg.width * scale - xOffset, locc[1] / 30 * imgg.height * scale - yOffset));
          var locc = combos.pop()
          all_particles.addParticle(createVector(locc[0] / 30 * imgg.width * scale - xOffset, locc[1] / 30 * imgg.height * scale - yOffset));
          var locc = combos.pop()
          all_particles.addParticle(createVector(locc[0] / 30 * imgg.width * scale - xOffset, locc[1] / 30 * imgg.height * scale - yOffset));
          var locc = combos.pop()
          all_particles.addParticle(createVector(locc[0] / 30 * imgg.width * scale - xOffset, locc[1] / 30 * imgg.height * scale - yOffset));
          var locc = combos.pop()
          all_particles.addParticle(createVector(locc[0] / 30 * imgg.width * scale - xOffset, locc[1] / 30 * imgg.height * scale - yOffset));
        }
        catch(err){
          var x = Array(31).fill().map((_, i) => i);
          var y = Array(31).fill().map((_, i) => i);
          combos = []
          for (var i = 0; i < x.length; i++) {
            for (var j = 0; j < y.length; j++) {
              combos.push([x[i], y[j]])
            }
          }
          combos = shuffle(combos)
          //or combos = new Array(2);

        }
      } else {
        all_particles.addParticle(createVector(random() * imgg.width * scale - xOffset, random() * imgg.height * scale - yOffset));
        all_particles.addParticle(createVector(random() * imgg.width * scale - xOffset, random() * imgg.height * scale - yOffset));

      }
    }
  }
  all_particles.update();
}




function keyTyped() {
  if (key === 'u') {
    rerender()
  } else if (key === 'c') {
    clear();
  } else if (key == 'r') {
    //lShade();
  } else if (key == 'p') {
    save('image.jpg');
  } else if (key == 's') {
    small = !small
  } else if (key == 'b') {
    big = !big
  } else if (key == 'f') {
    filll = !filll;
  } else if (key == 'a') {
    colorfuckery = !colorfuckery
  } else if (!isNaN(Number(key))) {
    if (Number(key) <= 5) {
      K = (Number(key) - 1) / 4
    } else {
      alphaa = 100 * ((Number(key) - 5) / 4)
      if (A < 0) {
        alphaa = 100
      }
    }
  } else if (key == 'g') {
    grid = !grid
  }
  return false;
}


function particleSystem() {
  this.count = 0;
  this.wanderers = [];
  this.lastSortLength = 0;

  this.addParticle = function(location) {
    this.count++;
    append(this.wanderers, new Particle(location));
  };

  this.update = function() {
    for (var i = 0; i < this.wanderers.length; i++) {
      this.wanderers[i].update();
      //this.done.push(this.wanderers[i]); //every particle should be in the list
      if (this.wanderers[i].isDead()) {
        this.wanderers.splice(i, 1);
        this.count--;
      } else {
        this.wanderers[i].display();
        //this.wanderers.display();
      }
    }
  };
}

function compare(a, b) {
  if (a.getz() > b.getz()) return 1;
  if (b.getz() > a.getz()) return -1;
  return 0;
}

function rerender() {
  if (lastSortLength != done.length) {
    this.done.sort((a, b) => a.getz() - b.getz());
    for (var i = 0; i < done.length; i++) {
      done[i].display()
    }
  }
  lastSortLength = done.length
};

function lShade() {
  for (var i = 0; i < done.length; i++) {
    done[i].lightShade()
  }
};
// function keyTyped() {
//   if (key === 'c') {
//     clear();
//     background(0);
//   } else if (key === 'u') {
//     all_particles.rerender()
//   }
//   // uncomment to prevent any default behavior
//   // return false;
// }
class Pointipoint {
  constructor(loc, sizee, ang, agee) {
    this.location = createVector(loc.x, loc.y);
    this.size = sizee
    this.angle = ang
    this.age = agee
    var rVal = red(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    var gVal = green(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    var bVal = blue(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    if (colorfuckery) {
      this.R = (random() * 30 - 60) + rVal
      this.G = (random() * 30 - 60) + gVal
      this.B = (random() * 30 - 60) + bVal
    } else {
      this.R = rVal
      this.G = gVal
      this.B = bVal
    }
    if (sat) {
      var Intensity = 0.3 * rVal + 0.59 * gVal + 0.11 * bVal
      this.R = Intensity * K + rVal * (1 - K)
      this.G = Intensity * K + gVal * (1 - K)
      this.B = Intensity * K + bVal * (1 - K)
    }
    this.x1 = this.location.x + Math.cos(this.angle + (2 * Math.PI / 3)) * this.size / 2
    this.y1 = this.location.y + Math.sin(this.angle + (2 * Math.PI / 3)) * this.size / 2
    this.x2 = this.location.x + Math.cos(this.angle + 2 * (2 * Math.PI / 3)) * this.size / 2
    this.y2 = this.location.y + Math.sin(this.angle + 2 * (2 * Math.PI / 3)) * this.size / 2
    this.x3 = this.location.x + Math.cos(this.angle) * this.size / 2
    this.y3 = this.location.y + Math.sin(this.angle) * this.size / 2
  };

  display() {
    //var coll= color('RGB('+this.R+','+this.G+','+this.B+','+alphaa+')')
    var coll = color(this.R, this.G, this.B)
    var coll = color(this.R, this.G, this.B, alphaa)
    fill(coll) //, 255 - 255 * (this.size / this.isize) ** (1 / 3));
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  lightShade() {
    ambientMaterial(this.R, this.G, this.B) //, 255 - 255 * (this.size / this.isize) ** (1 / 3));
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  getz() {
    return this.age
  }
}


class Particle {
  constructor(location) {
    this.location = createVector(location.x, location.y, 0);
    var sizeScale = 20
    this.isize = min(windowHeight / sizeScale, windowWidth / sizeScale);
    this.size = min(windowHeight / sizeScale, windowWidth / sizeScale);
    if (big) {
      this.size = this.size * 3
    } else if (small) {
      this.size = this.size / 4
    } else {
      this.size = this.size / 2
    }
    this.velocity = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.angle = 0.0
    this.age = 0
    //this.color = new colorGenerator(this.location);
  }

  getz() {
    return this.age
  }

  update(location) {
    this.angle += random(0, TWO_PI);
    var magnitude = random(0, 5);
    this.acc.x += cos(this.angle) * magnitude;
    this.acc.y += sin(this.angle) * magnitude;
    this.acc.limit(5);
    this.velocity.add(this.acc);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.size = this.size * 0.9;
    this.age++
  }

  display() {
    var h = new Pointipoint(this.location, this.size, this.angle, this.age);
    done.push(h);
    h.display();
  }

  redisplay() {
    //ambientMaterial(this.color.R, this.color.G, this.color.B) //, 255 - 255 * (this.size / this.isize) ** (1 / 3));
    //triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  isDead() {
    if (this.age > 50 || this.size <= 0.001) {
      return true;
    } else {
      return false;
    }
  }
}

class colorGenerator {
  constructor(loc) {
    this.locc = loc
    if (colorfuckery) {
      this.R = (random() * 1.2 - 0.6) * red(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
      this.G = (random() * 1.2 - 0.6) * green(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
      this.B = (random() * 1.2 - 0.6) * blue(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    } else {
      this.R = red(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
      this.G = green(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
      this.B = blue(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))

    }
  }

  update(loc) {
    // if (loc == this.locc) {
    //   return true
    // }
    this.locc = loc
    this.R = red(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    this.G = green(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
    this.B = blue(imgg.get(floor((loc.x + xOffset) / scale), floor((loc.y + yOffset) / scale)))
  }
}

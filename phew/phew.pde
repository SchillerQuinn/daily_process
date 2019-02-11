float t;
float angle =0;
int NUM_LINES = 380;
float v1 =0.4;
float v2;
boolean increment = false;
float z = 0.00001;
float colormod = 1.0;
float c = 1;

void setup() {
  background(20);
  size(500, 500);
  v1 = random(0.3)+0.2;
  smooth(2);
  colorMode(HSB);
}

void draw() {
  background(0);
  angle+= 0.01;
  stroke(255, 200);

  translate(width/2, height/2);
  rotate(sin(angle));

  for (int i=1; i < NUM_LINES; i++) {
    strokeWeight(5);
    if (c >= 255)  c=150;  else  c = c + 0.001;
    stroke(150, c, 255);
    point(x(t+i), y(t+i));
    point(x2(t+i), y2(t+i));


    strokeWeight(1.2);
    if (colormod >= 460.0) {
      colormod = 0;
    }
    if (colormod > 255.0) {
      stroke(255 - (colormod % 255));
    } else {
      stroke(50+colormod);
    }
    line(x(t+i), y(t+i), x2(t+i), y2(t+i));
    colormod = colormod+.005;
  }

  t += 0.005;

  if (increment) v1+=z;
}

void mousePressed() {
  v1 = random(0.3)+0.2;
}


void keyReleased() {
  increment = false;
}


void keyPressed() {
  if (key == ' ') {
    v1 = random(0.4)+0.2;
  }

  if (keyCode == LEFT) {
    increment = true;
    z = -0.00001;
  } else if (keyCode == RIGHT) {
    increment = true;
    z = 0.00001;
  } 

  if (keyCode == UP) {

    NUM_LINES+=1;
    println("Lines: "+NUM_LINES);
  } else if (keyCode == DOWN) {

    NUM_LINES-=1;
    println("Lines: "+NUM_LINES);
  }
}



float x(float t) {

  return sin(t/10)*100 + cos(t/v1)*100;
}


float y(float t) {

  return cos(t/10)*100 + sin(t/v1)*100;
}





float x2(float t) {

  return sin(t/10)*10 + cos(t/v1)*100;
}


float y2(float t) {

  return cos(t/10)*10 + sin(t/v1)*100;
}

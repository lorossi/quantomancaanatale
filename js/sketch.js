let snowflakes = [];
let snowflakes_amount = 150;
let f; /// floor
let snow_rotation; // snowflakes rotation angle
let tree_speed; // trees movement speed

function setup() {
  let canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent('sketch');

  f = new Floor();
}

function draw() {
  background("#B3000C");

  snowflakes.forEach((s, i) => {
    s.show();
    s.move(snow_rotation);

    if (s.hit_floor) {
      s.hit_floor = false;
      f.raise(s.raise_value);
    }
  });

  f.show();
}

class Snowflake {
  constructor() {
    this.hit_floor = false; // has the snowflake hit the floor?

    let x = random(width);
    let y = random(-height, 0);
    this.position = createVector(x, y);

    let distance = random(10);
    this.opacity = map(distance, 0, 10, 160, 220);
    this.fill_color = color(216, 216, 216, this.opacity);
    this.raise_value = map(distance, 0, 10, 0.01, 0.05); // how much it raises the floor

    if (windowWidth > 600) { // PC
      this.speed = map(distance, 0, 10, .25, 2.5);
      this.size = map(distance, 0, 10, width/200, width/100);
    } else { //phone
      this.speed = map(distance, 0, 10, .25, 1.25);
      this.size = map(distance, 0, 10, width/100, width/50);
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(this.fill_color);
    circle(0, 0, this.size);
    pop();
  }

  move(phi, wind) {
    this.velocity = createVector(0, this.speed).rotate(phi);
    this.position.add(this.velocity);

    if (this.position.y > height) {
      this.hit_floor = true;
      this.position.y = 0;
      this.position.x = random(width);
    }

    if (this.position.x < 0) this.position.x += width;
    else if (this.position.x > width) this.position.x -= width;
  }
}

class Floor {
  constructor() {
    this.reset();
    this.fill_color = this.fill_color = color(216, 216, 216, this.opacity);
  }

  reset() {
    this.snow_height = 0;
  }

  raise(value) {
    this.snow_height += value;
  }

  show() {
    push();
    noStroke();
    fill(this.fill_color);
    rect(0, windowHeight - this.snow_height, windowWidth, this.snow_height);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  snowflakes = [];
  generateSnowflakes();
}

function equi_triangle(x, y, scl) {
  push();
  beginShape();
  for (let i = 0; i < 3; i++) {
    let phi = -PI / 2 + TWO_PI / 3 * i;
    let vx, vy;
    vx = scl * cos(phi) + x;
    vy = scl * sin(phi) + y;
    vertex(vx, vy);
  }
  endShape(CLOSE);
  pop();
}

function mouseMoved() {
  generateSnowflakes();

  let a_factor = 3/4;
  let x = mouseX;
  if (x > width) x = width;
  snow_rotation = map(mouseX, 0, width, a_factor * PI/2, a_factor * -PI/2); // snowfloakes rotation angle
}

function generateSnowflakes() {
  if (snowflakes.length != 0) return;

  for (let i = 0; i < snowflakes_amount; i++) {
    snowflakes.push(
      new Snowflake()
    );
  }

  f.reset();
}

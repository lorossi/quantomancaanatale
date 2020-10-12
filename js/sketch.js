let snowballs = [];
let amount = 200;

function setup() {
  let canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent('sketch');

  for (let i = 0; i < amount; i++) {
    snowballs.push(
      new Snowball()
    );
  }
}

function draw() {
  background("#B3000C");

  snowballs.forEach((s, i) => {
    s.show();
    s.move();
  });
}


class Snowball {
  constructor() {
    let x = random(width);
    let y = random(-height, 0);
    this.position = createVector(x, y);

    let distance = random(10);
    this.opacity = map(distance, 0, 10, 180, 220);

    if (width > 600) {
      this.speed = map(distance, 0, 10, .5, 2.5);
      this.size = map(distance, 0, 10, width/200, width/100);
    } else {
      this.speed = map(distance, 0, 10, .25, 1.25);
      this.size = map(distance, 0, 10, width/100, width/50);
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(216, 216, 216, this.opacity);
    circle(0, 0, this.size);
    pop();
  }

  move() {
    let a_factor = 4/5;
    let a = map(mouseX, 0, width, a_factor * PI/2, a_factor * -PI/2);

    this.velocity = createVector(0, this.speed).rotate(a);
    this.position.add(this.velocity);

    if (this.position.y > height) {
      this.position.y = 0;
      this.position.x = random(width);
    }

    if (this.position.x < 0) this.position.x += width;
    else if (this.position.x > width) this.position.x -= width;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  snowballs = [];
  for (let i = 0; i < amount; i++) {
    snowballs.push(
      new Snowball()
    );
  }
}

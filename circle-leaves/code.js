const leaves_num = 30

let width, height, cx, cy;
const svg = document.getElementById('svg'),
  svgGroup = document.getElementById('svg-group'),
  overlay = document.getElementById('overlay');

const line = d3.line().curve(d3.curveBasis);

const colors = chroma.scale(['#91B43C', '#C86B28', '#FFC501', '#CB2228']);//.mode('lch');

function init() {
  onResize();
  window.addEventListener('resize', onResize, false);

  initStartAnim();

  const inputHandler = new InputHandler({
    elt: overlay,
    onInputStart(e) {
      this.x0 = this.x; this.y0 = this.y;
      this.path = new DrawPath(svgGroup, chroma.random().hex());
      this.path.points = [[this.x, this.y], [this.x, this.y]];
    },
    onInputMove(e) {
      this.rad = Math.atan2(this.x0 - this.x, this.y - this.y0);
      const points = this.path.points;
      const dx = this.x - this.x0;
      const dy = this.y - this.y0;
      if (dx * dx + dy * dy > 100) {
        points.push([this.x0 = this.x, this.y0 = this.y]);
        let w = 10 + rnd(20);
        let h = w + rnd(w * 2);
        let rz = (this.rad + rnd(Math.PI / 3, true)) * 180 / Math.PI;
        let fill = chroma(this.path.stroke).set('hsl.l', 0.2 + rnd(0.4)).hex();
        new Leaf(svgGroup, this.x, this.y, w, h, 3 + Math.round(rnd(5)), rz, this.path.stroke, fill);
      }
      else {
        points[points.length - 1] = [this.x, this.y];
      }
      this.path.updatePathD();
    },
    onInputEnd(e) {
      if (this.rad) {
        let w = 10 + rnd(10);
        let h = w + rnd(w * 2);
        let fill = chroma(this.path.stroke).set('hsl.l', 0.2 + rnd(0.4)).hex();
        new Leaf(svgGroup, this.x, this.y, w, h, 3 + Math.round(rnd(5)), this.rad * 180 / Math.PI, this.path.stroke, fill);
      }
    },
    updateInputCoords(e) {
      this.x = this.currX - cx;
      this.y = this.currY - cy;
    },
  });
}

function initStartAnim() {
  const n = 4; r1 = 150, r2 = leaves_num, dr = (r1 - r2) / (n - 1);
  createRing(0, 0, r1, 30);
  for (let i = 1; i < n; i++) {
    TweenMax.to({}, i * 0.5, {
      onComplete() {
        createRing(0, 0, r1 - i * dr, leaves_num - i * 6);
      }
    });
  }
}

function createRing(rx, ry, r, n) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttributeNS(null, 'cx', rx);
  circle.setAttributeNS(null, 'cy', ry);
  circle.setAttributeNS(null, 'r', r);
  let stroke = colors(rnd(1)).hex(); // chroma.random().hex();
  circle.style.stroke = stroke;
  svgGroup.appendChild(circle);

  const da = 2 * Math.PI / n;
  let a, x, y, w, h, rz, fill;
  for (let i = 0; i < n; i++) {
    a = i * da;
    x = Math.cos(a) * r;
    y = Math.sin(a) * r;
    w = 10 + rnd(r / 4);
    h = w + rnd(w * 2);
    rz = a * 180 / Math.PI - 90;
    fill = chroma(stroke).set('hsl.l', 0.2 + rnd(0.4)).hex();
    new Leaf(svgGroup, x, y, w, h, 3 + Math.round(rnd(5)), rz, stroke, fill);
  }
}

function onResize() {
  const r = svg.getBoundingClientRect();
  width = r.width;
  height = r.height;
  cx = width / 2;
  cy = height / 2;
  svgGroup.style.transform = `translate(${cx}px, ${cy}px)`;
}

class DrawPath {
  constructor(parent, stroke) {
    this.parent = parent;
    this.points = [];
    this.stroke = stroke;
    this.create();
  }
  create() {
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.style.stroke = this.stroke;
    this.parent.appendChild(this.path);
  }
  pathD() {
    return line(this.points);
  }
  updatePathD() {
    this.path.setAttributeNS(null, 'd', this.pathD());
  }
}

function rColor(steps) {

}

class Leaf {
  constructor(elt, x, y, w, h, n, rz, stroke, fill) {
    this.elt = elt;
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.n = n;
    this.rz = rz;
    this.stroke = stroke;
    this.fill = fill;

    this.ep = { x: rnd(w / 20, true), y: h + rnd(h / 20, true) };
    this.stemH = h / 10;
    this.left = new Curve(
      { x: 0, y: this.stemH },
      { x: -w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
      { x: -w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
      this.ep
    );
    this.right = new Curve(
      { x: 0, y: this.stemH },
      { x: w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
      { x: w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
      this.ep
    );
    this.center = new Curve(
      { x: 0, y: this.stemH },
      { x: rnd(w / 20, true), y: h / 3 + rnd(h / 20, true) },
      { x: rnd(w / 20, true), y: 2 * h / 3 + rnd(h / 20, true) },
      this.ep
    );
    this.create();
  }
  create() {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.group.classList.add('leaf');
    this.group.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.elt.appendChild(this.group);

    let innerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    innerGroup.style.transform = `rotate3d(0, 0, 1, ${this.rz}deg)`;
    this.group.appendChild(innerGroup);

    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.setAttributeNS(null, 'd', this.pathD());

    let length = this.path.getTotalLength() / 4;  // ?
    this.path.style.stroke = this.stroke;
    // this.path.style.fill = this.fill;
    this.path.style.strokeDasharray = length;
    this.path.style.strokeDashoffset = length;
    innerGroup.appendChild(this.path);
    TweenMax.to(this.path, 4 + rnd(4), { strokeDashoffset: 0, fill: this.fill });
  }
  pathD() {
    let d = [];
    d.push(`M0,0 L0,${this.stemH}`);
    d.push(this.left.pathD());
    d.push(this.right.pathD());
    d.push(this.center.pathD());

    for (let i = 0; i < this.n; i++) {
      let p1 = this.center.getXY(i * (0.9 / this.n));
      let p2 = this.left.getXY(0.5 + i * (0.5 / this.n));
      d.push(`M${p1.x},${p1.y} L${p2.x},${p2.y}`);
      p2 = this.right.getXY(0.5 + i * (0.5 / this.n));
      d.push(`M${p1.x},${p1.y} L${p2.x},${p2.y}`);
    }

    return d.join(' ');
  }
}

class Curve {
  constructor(sp, cp1, cp2, ep) {
    this.sp = sp;
    this.cp1 = cp1;
    this.cp2 = cp2;
    this.ep = ep;
  }
  pathD() {
    let d = [];
    d.push(`M${this.sp.x} ${this.sp.y}`);
    d.push(`C${this.cp1.x},${this.cp1.y}`);
    d.push(`${this.cp2.x},${this.cp2.y}`);
    d.push(`${this.ep.x},${this.ep.y}`);
    return d.join(' ');
  }
  getXY(t) {
    return {
      x: Math.pow(1 - t, 3) * this.sp.x + 3 * t * Math.pow(1 - t, 2) * this.cp1.x
        + 3 * t * t * (1 - t) * this.cp2.x + t * t * t * this.ep.x,
      y: Math.pow(1 - t, 3) * this.sp.y + 3 * t * Math.pow(1 - t, 2) * this.cp1.y
        + 3 * t * t * (1 - t) * this.cp2.y + t * t * t * this.ep.y
    };
  }
}

/**
  * input handler
  */
function InputHandler(conf) {
  conf.elt.addEventListener('mousedown', e => this.onMouseDown(e));
  conf.elt.addEventListener('mousemove', e => this.onMouseMove(e), false);
  conf.elt.addEventListener('mouseup', e => this.onMouseEnd(e));
  conf.elt.addEventListener('mouseleave', e => this.onMouseEnd(e));

  conf.elt.addEventListener('touchstart', e => this.onTouchStart(e));
  conf.elt.addEventListener('touchmove', e => this.onTouchMove(e));
  conf.elt.addEventListener('touchend', e => this.onTouchEnd(e));
  conf.elt.addEventListener('touchleave', e => this.onTouchEnd(e));

  this.onInputStart = conf.onInputStart;
  this.onInputMove = conf.onInputMove;
  this.onInputEnd = conf.onInputEnd;
  this.updateInputCoords = conf.updateInputCoords;
}

/**
  * mouse events
  */
InputHandler.prototype.onMouseDown = function (e) {
  if (e.which == 1) {
    this.mouseDown = true;
    this.updateMouseCoords(e);
    this.onInputStart(e);
  }
};
InputHandler.prototype.onMouseMove = function (e) {
  if (this.mouseDown) {
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.updateMouseCoords(e);
    this.onInputMove(e);
  }
};
InputHandler.prototype.onMouseEnd = function (e) {
  if (this.mouseDown) {
    this.mouseDown = false;
    this.onInputEnd(e);
  }
};
InputHandler.prototype.updateMouseCoords = function (e) {
  var clientRect = e.target.getBoundingClientRect();
  this.currX = e.clientX - clientRect.left;
  this.currY = e.clientY - clientRect.top;
  this.updateInputCoords(e);
};
/**
  * touch events
  */
InputHandler.prototype.onTouchStart = function (e) {
  e.preventDefault();
  this.touchDown = true;
  this.updateTouchCoords(e);
  this.onInputStart(e);
};
InputHandler.prototype.onTouchMove = function (e) {
  if (this.touchDown) {
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.updateTouchCoords(e);
    this.onInputMove(e);
  }
};
InputHandler.prototype.onTouchEnd = function (e) {
  if (this.touchDown) {
    e.preventDefault();
    this.touchDown = false;
    this.onInputEnd(e);
  }
};
InputHandler.prototype.updateTouchCoords = function (e) {
  var clientRect = e.target.getBoundingClientRect();
  this.currX = e.changedTouches[0].clientX - clientRect.left;
  this.currY = e.changedTouches[0].clientY - clientRect.top;
  this.updateInputCoords(e);
};

function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max;
}

init();
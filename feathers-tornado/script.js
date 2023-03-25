let width, height, cx, cy;
const svg = document.getElementById('svg'),leaves = document.getElementById('leaves');
const nbLeaves = donors.length;

const simplex = new SimplexNoise();
// let colors = chroma.scale([chroma.random(), chroma.random(), chroma.random()]).mode('lch');
// let colors = chroma.scale(['#C86B28', '#FFC501', '#CB2228', '#91B43C']);

// let colors = chroma.scale(['#f2f2f2', '#e6e6e6', '#d1d1d1', '#bababa', '#a6a4a4', '#919191']);
let colors = chroma.scale(['#e8f4ff', '#e0f0ff', '#d2e7fa', '#c2e1fc', '#b6dcfc', '#a2cff5']);
let count = 0,timeout;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
  onResize();
  window.addEventListener('resize', onResize, false);

  for (donor of donors) {
    createLeaf(donor)
    await sleep(rnd(500))
  }
}

function createLeaf(donor) {
  let size = 30 // min size (width)
  let w = size + rnd(20); 
  let h = w + rnd(w * 2);
  let x = rnd(cx - cx / 5, true);
  let y = rnd(cy - cy / 5, true);
  let l = new Leaf(x, y, w, h, 3 + Math.round(rnd(5)));
  l.create(leaves, donor);
}

class Leaf {
  constructor(x, y, w, h, n, donor) {
    this.x = x;this.y = y;
    this.w = w;this.h = h;
    this.n = n;
    this.color = colors((1 + simplex.noise2D(0.5 * y / cy, 0.5 * x / cx)) / 2);
    this.fill = this.color.hex();
    this.stroke = this.color.darken(2).hex();
    this.rz = simplex.noise2D(0.5 * x / cx, 0.5 * y / cy) * 180 + 180;
    this.ep = { x: rnd(w / 20, true), y: h + rnd(h / 20, true) };
    this.stemH = h / 10;
    this.left = new Curve(
    { x: 0, y: this.stemH },
    { x: -w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
    { x: -w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
    this.ep);

    this.right = new Curve(
    { x: 0, y: this.stemH },
    { x: w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
    { x: w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
    this.ep);

    this.center = new Curve(
    { x: 0, y: this.stemH },
    { x: rnd(w / 20, true), y: h / 3 + rnd(h / 20, true) },
    { x: rnd(w / 20, true), y: 2 * h / 3 + rnd(h / 20, true) },
    this.ep);
  }
  create(elt, donor) {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.group.style.transform = `translate(${this.x}px, ${this.y}px) rotate3d(0, 0, 1, ${this.rz}deg)`;
    elt.appendChild(this.group);

    let py = this.h / 3;
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.setAttributeNS(null, 'd', this.pathD());
    this.path.style.stroke = this.stroke;
    this.path.style.fill = 'rgba(0,0,0,0)';
    this.group.appendChild(this.path);

    let length = this.path.getTotalLength() / 3;

    this.path.style.strokeDasharray = length;
    this.path.style.strokeDashoffset = length;
    TweenMax.to(this.path, 3 + rnd(5), { strokeDashoffset: 0, fill: this.fill });


    const leaf_height = this.group.getBBox().height.toFixed(2);
    const leaf_width = this.group.getBBox().width.toFixed(2);
    let first_part = false
    donor.split(" ").forEach((word) => {
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', 0);
      text.setAttributeNS(null, 'y', 0);
      text.setAttributeNS(null, 'text-anchor', 'middle');
      text.setAttributeNS(null, 'dominant-baseline', 'middle');
      text.setAttributeNS(null, 'font-size', `${leaf_height/12}px`);
      text.setAttributeNS(null, 'font-family', 'sans-serif');
      text.setAttributeNS(null, 'fill', this.stroke);

      if (first_part) {
        text.style.transform = `rotate(90deg) translate(${leaf_height/2}px, ${leaf_width/6}px)`;
      } else {
        text.style.transform = `rotate(90deg) translate(${leaf_height/2}px, ${-leaf_width/6}px)`;
      }

      text.innerHTML = word;
      this.group.appendChild(text);

      first_part = true

      text = this.group.querySelector('text:last-child');
      setTimeout(() => {
        text.classList.add('animated');
      }, 2500);

      if (! word) {
        this.group.classList.add('no-word');
      }
    })
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
  }}


class Curve {
  constructor(sp, cp1, cp2, ep) {
    this.sp = sp;
    this.cp1 = cp1;
    this.cp2 = cp2;
    this.ep = ep;
  }
  pathD() {
    let d = [`M${this.sp.x} ${this.sp.y} `];
    d.push(`C${this.cp1.x},${this.cp1.y}`);
    d.push(`${this.cp2.x},${this.cp2.y}`);
    d.push(`${this.ep.x},${this.ep.y}`);
    return d.join(' ');
  }
  getXY(t) {
    return {
      x: Math.pow(1 - t, 3) * this.sp.x + 3 * t * Math.pow(1 - t, 2) * this.cp1.x +
      3 * t * t * (1 - t) * this.cp2.x + t * t * t * this.ep.x,
      y: Math.pow(1 - t, 3) * this.sp.y + 3 * t * Math.pow(1 - t, 2) * this.cp1.y +
      3 * t * t * (1 - t) * this.cp2.y + t * t * t * this.ep.y };

  }}


function onResize() {
  const r = svg.getBoundingClientRect();
  width = r.width;
  height = r.height;
  cx = width / 2;
  cy = height / 2;
  leaves.setAttributeNS(null, 'transform', `translate(${cx}, ${cy})`);;
}

function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max;
}

init();
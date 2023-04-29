let width, height, cx, cy;
const svg = document.getElementById('svg'),leaves = document.getElementById('leaves');
const nbLeaves = donors.length;

const simplex = new SimplexNoise();
// let colors = chroma.scale([chroma.random(), chroma.random(), chroma.random()]).mode('lch');
// let colors = chroma.scale(['#C86B28', '#FFC501', '#CB2228', '#91B43C']);

// let colors = chroma.scale(['#f2f2f2', '#e6e6e6', '#d1d1d1', '#bababa', '#a6a4a4', '#919191']);
let colors = chroma.scale(['#cee2f0']);
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
    let first_part = true
    donor.split(" ").forEach((word) => {
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', 0);
      text.setAttributeNS(null, 'y', 0);
      text.setAttributeNS(null, 'text-anchor', 'middle');
      text.setAttributeNS(null, 'dominant-baseline', 'middle');
      text.setAttributeNS(null, 'font-size', `${leaf_height/12}px`);
      text.setAttributeNS(null, 'font-family', 'sans-serif');
      text.setAttributeNS(null, 'fill', this.stroke);

      console.log (leaf_height)
      let translateY

      if (first_part) {
        translateY = -leaf_width/5*3
      } else {
        translateY = -leaf_width/5*1.6
      }
      
      text.style.transform = `rotate(90deg) translate(${leaf_height/2}px, ${translateY}px) scale(0.8)`;
      text.innerHTML = word;
      this.group.appendChild(text);

      first_part = false

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
    let d = "m51.5 100.9c-1 6.5-2.3 12.8-4 19-7.5 8.3-16 16.6-20.8 26.7q0.5-4 0.9-8c2.4-4.2 4.4-8.7 7-12.8 3-4.7 6-9.7 6.2-15.3 0-0.1-0.1-0.1-0.1-0.1-1.8 6.1-4.7 11.3-8.1 16.5-1.3 2.1-3 4.2-4.5 6.5q0.2-2 0.4-4 0.2-2.1 0.4-4.3c1.4-3.3 2.6-6.8 4.3-10 2.6-4.7 5.7-9.2 8.1-14 0 0 0-0.1-0.1-0.1-3.6 4.1-6.7 8.6-9.5 13.3-0.7 1.2-1.5 2.5-2.2 3.9q0.4-5.6 0.8-11.2c6.2-13.6 18.4-29 22.4-44.8 1.7 12.8 0.7 26.2-1.2 38.7zm-14.5 48c-3.4 6.6-9.2 13.5-13.2 20.3 1.1-6.8 1.9-13.6 2.7-20.3 5.1-7.8 12-14.8 18.8-21.6q-3.5 11.1-8.3 21.6zm-19.7-113.1c-0.2-2.2-0.4-4.5-0.5-6.7 4.2-10.3 9.1-21.1 9.6-30.9 9.6 15.2 17.3 34.2 23.4 50.7q1.3 4.3 2.1 8.7c-3.9 16.2-14.6 31.1-21.4 46.1q0.3-7 0.5-14c3.9-12.1 7.1-24.6 9.5-37.1 0-0.1-0.1-0.1-0.1 0-3 6.2-4.2 13-6.4 19.6-0.8 2.5-1.9 5.1-2.8 7.8 0-16.3-0.9-32.5-3-48.4 0-0.1-0.1-0.1-0.1 0 0.5 12.7 0.7 25.3 0.6 37.9-3.3-11.6-9.7-21.4-11.4-33.7zm9 86.9c-0.8 8.7-1.9 17.4-3.2 26.1q0 0 0 0-1.3 8.8-2.9 17.5c-8.8-7.5-12.3-22.9-14.3-33.6-1.6-9.2-2.3-18.3-2.4-27.4-0.2-0.5-0.4-0.9-0.5-1.4l0.5 1.1q-0.1-3.5 0-7 0.2 0.8 0.3 1.6c0.8 3.6 1.5 7.5 2.3 11.3q0.3 1.2 0.6 2.4c1.3 5.2 3.2 10.2 6.7 14.1q0.1 0.2 0.2 0.3 0.9 0.9 2 1.8c0 0 0.1 0 0-0.1-6.8-8.4-7.3-20.1-9.4-30.4-1-4.5-1.8-8.9-2.3-13.3q0.2-4.1 0.6-8.2v-3.7c3 7.9 11.3 15.3 17.9 21l0.8 0.8c-9-9-13.1-21.4-16.8-33.1 0 0 3.1-13.5 5.7-20.9q0.9-2.7 1.9-5.6c1.8 12.1 6 23.6 14.3 33.4q0 0 0 0 0.2 0.5 0.4 1c0 17.4-0.7 34.8-2.4 52.3zm-3-27.1h-0.1q0 0 0.1 0zm-0.7 72.3q0.2 1.4 0.3 2.8c0.2 5.7-1.7 11.8-3.5 17-1.3 3.7-3.5 11.2-7.5 13.7q-0.9 0.6-1.9 0.8c-1.2 0.2-2.3-1-1.6-2.2 1.2-1.9 3-3.3 4.2-5.3q1.2-2.1 2.2-4.3 1.2-2.5 2.1-5.1c1.4-4.4 2.7-8.8 3.4-13.4-0.2 0.5-0.8 0.6-1.2 0.3q0 0 0 0c-2.6-2.6-4.9-4.8-8.3-6.5-3-1.5-6.3-2.8-9-4.8-5.1-3.5-7.1-8-9-13.7-0.1-0.2 0.2-0.3 0.3-0.1 2.3 3.2 3.8 7.1 6.9 9.9 2.5 2.2 5.4 3.8 8.5 5.2 1.5 0.7 3.1 1.4 4.8 2.3-4.5-4.2-9.1-8.6-11.7-13.8-3.5-7-6.1-14.8-7-22.6-0.1-0.1 0.1-0.2 0.2-0.1 3.3 7.7 4.8 17.1 9.9 23.8 4.4 6 11 9.8 15.2 15.9q0.1 0 0.1 0.1c0.4 0.5 0.1 1.1-0.4 1.5q0 0.2 0 0.4 0.5 0.8 0.8 1.7 0 0 0 0.1 0 0 0 0.1 0.3-1.7 0.5-3.5c0.1-0.9 1.5-1.2 1.7-0.2zm24.5-16.5c-5.4 8.8-11.9 22.7-22.3 26.2-0.7 0.3-1.3-0.7-0.8-1.2 4.8-4.5 9.2-8 13-13.4 2.9-4.2 5.5-8.7 9.6-11.9 0.3-0.2 0.6 0 0.5 0.3z"
    return d
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
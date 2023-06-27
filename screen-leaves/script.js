let width, height, cx, cy
const svg = document.getElementById('svg'), leaves = document.getElementById('leaves')


const simplex = new SimplexNoise()
// let colors = chroma.scale([chroma.random(), chroma.random(), chroma.random()]).mode('lch');
// let colors = chroma.scale(['#C86B28', '#FFC501', '#CB2228', '#91B43C']);
let colors = chroma.scale(['#7D8844', '#BFAF36', '#EFB248', '#ED8761', '#B12F49', '#7D8844'])
let count = 0, timeout

function getIsOverlap(elem) {
  // Get bg image
  let bg = document.getElementById('bg')

  bg = bg.getBoundingClientRect()    //BOUNDING BOX OF THE FIRST OBJECT
  elem = elem.getBoundingClientRect()    //BOUNDING BOX OF THE SECOND OBJECT

  //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(elem.left > bg.right ||
    elem.right < bg.left ||
    elem.top > bg.bottom ||
    elem.bottom < bg.top)
}
async function init() {
  onResize()
  window.addEventListener('resize', onResize, false)

  createLeaves()

  svg.addEventListener('mouseup', e => {
    count = 0
    if (timeout) clearTimeout(timeout)
    while (leaves.firstChild) {
      leaves.removeChild(leaves.firstChild)
    }
    colors = chroma.scale([chroma.random(), chroma.random(), chroma.random()]).mode('lch')
    createLeaves()
  })
}

async function createLeaves() {
  // Get donations names and number
  const donations = await getDonations()

  for (donor of donations) {
    createLeaf(donor)
    await new Promise(r => setTimeout(r, 500))
  }
}

async function createLeaf(donor) {
  let w = 15 + rnd(20)
  let h = w + rnd(w * 2)
  let x = rnd(cx - cx / 5, true)
  let y = rnd(cy - cy / 5, true)
  let l = new Leaf(x, y, w, h, 3 + Math.round(rnd(5)))
  l.create(leaves, donor)

  // Get last leaf
  const lastLeaf = document.querySelector("#leaves > g:last-child")

  // Check if leaf is overlapping
  const isOverlap = getIsOverlap(lastLeaf)
  if (isOverlap) {
    l.group.remove()
    // createLeaf(donor) 
    console.log("overlap", {lastLeaf})
  }
}

class Leaf {
  constructor(x, y, w, h, n) {
    this.x = x; this.y = y
    this.w = w; this.h = h
    this.n = n
    this.color = colors((1 + simplex.noise2D(0.5 * y / cy, 0.5 * x / cx)) / 2)
    this.fill = this.color.hex()
    this.stroke = this.color.darken(2).hex()
    this.rz = simplex.noise2D(0.5 * x / cx, 0.5 * y / cy) * 180 + 180
    this.ep = { x: rnd(w / 20, true), y: h + rnd(h / 20, true) }
    this.stemH = h / 10
    this.left = new Curve(
      { x: 0, y: this.stemH },
      { x: -w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
      { x: -w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
      this.ep)

    this.right = new Curve(
      { x: 0, y: this.stemH },
      { x: w / 2 + rnd(w / 5, true), y: this.stemH + rnd(h / 5, true) },
      { x: w / 2 + rnd(w / 5, true), y: this.stemH + h / 2 + rnd(h / 10, true) },
      this.ep)

    this.center = new Curve(
      { x: 0, y: this.stemH },
      { x: rnd(w / 20, true), y: h / 3 + rnd(h / 20, true) },
      { x: rnd(w / 20, true), y: 2 * h / 3 + rnd(h / 20, true) },
      this.ep)

  }
  create(elt, donor) {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.group.style.transform = `translate(${this.x}px, ${this.y}px) rotate3d(0, 0, 1, ${this.rz}deg)`
    elt.appendChild(this.group)

    let py = this.h / 3
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.path.setAttributeNS(null, 'd', this.pathD())
    this.path.style.stroke = this.stroke
    this.path.style.fill = 'rgba(0,0,0,0)'
    this.group.appendChild(this.path)

    let length = this.path.getTotalLength() / 3

    this.path.style.strokeDasharray = length
    this.path.style.strokeDashoffset = length
    TweenMax.to(this.path, 3 + rnd(5), { strokeDashoffset: 0, fill: this.fill })

    // Place donnor name
    const leaf_height = this.group.getBBox().height.toFixed(2)
    const leaf_width = this.group.getBBox().width.toFixed(2)
    let first_part = true
    donor.split(" ").forEach((word) => {
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttributeNS(null, 'x', 0)
      text.setAttributeNS(null, 'y', 0)
      text.setAttributeNS(null, 'text-anchor', 'middle')
      text.setAttributeNS(null, 'dominant-baseline', 'middle')
      text.setAttributeNS(null, 'font-size', `${leaf_height / 8}px`)
      text.setAttributeNS(null, 'font-family', 'sans-serif')
      text.setAttributeNS(null, 'fill', this.stroke)

      let translateY

      if (first_part) {
        translateY = -leaf_width / 5
      } else {
        translateY = leaf_width / 6
      }

      text.style.transform = `rotate(90deg) translate(${leaf_height / 2}px, ${translateY}px) scale(0.8)`
      text.innerHTML = word
      this.group.appendChild(text)

      first_part = false

      text = this.group.querySelector('text:last-child')
      setTimeout(() => {
        text.classList.add('animated')
      }, 2500)

      if (!word) {
        this.group.classList.add('no-word')
      }
    })
  }
  pathD() {
    let d = []
    d.push(`M0,0 L0,${this.stemH}`)
    d.push(this.left.pathD())
    d.push(this.right.pathD())
    d.push(this.center.pathD())

    for (let i = 0; i < this.n; i++) {
      let p1 = this.center.getXY(i * (0.9 / this.n))
      let p2 = this.left.getXY(0.5 + i * (0.5 / this.n))
      d.push(`M${p1.x},${p1.y} L${p2.x},${p2.y}`)
      p2 = this.right.getXY(0.5 + i * (0.5 / this.n))
      d.push(`M${p1.x},${p1.y} L${p2.x},${p2.y}`)
    }

    return d.join(' ')
  }
}


class Curve {
  constructor(sp, cp1, cp2, ep) {
    this.sp = sp
    this.cp1 = cp1
    this.cp2 = cp2
    this.ep = ep
  }
  pathD() {
    let d = [`M${this.sp.x} ${this.sp.y} `]
    d.push(`C${this.cp1.x},${this.cp1.y}`)
    d.push(`${this.cp2.x},${this.cp2.y}`)
    d.push(`${this.ep.x},${this.ep.y}`)
    return d.join(' ')
  }
  getXY(t) {
    return {
      x: Math.pow(1 - t, 3) * this.sp.x + 3 * t * Math.pow(1 - t, 2) * this.cp1.x +
        3 * t * t * (1 - t) * this.cp2.x + t * t * t * this.ep.x,
      y: Math.pow(1 - t, 3) * this.sp.y + 3 * t * Math.pow(1 - t, 2) * this.cp1.y +
        3 * t * t * (1 - t) * this.cp2.y + t * t * t * this.ep.y
    }

  }
}


function onResize() {
  const r = svg.getBoundingClientRect()
  width = r.width
  height = r.height
  cx = width / 2
  cy = height / 2
  leaves.setAttributeNS(null, 'transform', `translate(${cx}, ${cy})`);;
}

function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max
}

init()
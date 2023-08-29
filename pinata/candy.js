class Particle {

  constructor(svg, coordinates, friction) {
    this.svg = svg;
    this.steps = $(window).height() / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = this.coordinates.y;
    this.dimensions = this.render();
    this.rotation = Math.random() > 0.5 ? "-" : "+";
    this.scale = 0.5 + Math.random();
    this.siner = 200 * Math.random();
  }

  destroy() {
    this.item.remove();
  }

  move() {
    this.position = this.position - this.friction;
    let top = this.position;
    let left = this.coordinates.x + Math.sin(this.position * Math.PI / this.steps) * this.siner;
    this.item.css({
      transform: "translateX(" + left + "px) translateY(" + top + "px) scale(" + this.scale + ") rotate(" + this.rotation + (this.position + this.dimensions.height) + "deg)" });


    if (this.position < -this.dimensions.height) {
      this.destroy();
      return false;
    } else {
      return true;
    }
  }

  render() {
    this.item = $(this.svg, {
      css: {
        transform: "translateX(" + this.coordinates.x + "px) translateY(" + this.coordinates.y + "px)",
      } });


    const svg = this.item[0];
    
    // random fill color
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    svg.setAttribute("fill", color);

    $("body").append(this.item);
    return {
      width: this.item.width(),
      height: this.item.height() 
    };


  }}

const candy = '<svg viewBox="0 0 30 30"><path d="M21.447 5.918l2.553 1.141-.028.026c-.552.824-2.454 2.453-5.232 2.967.38 4.629-4.096 8.896-8.471 8.471-.77 2.957-2.368 4.907-3.21 5.477l-1.128-2.539-1.65-.237-.121-1.374-1.373-.172-.232-1.585-2.555-1.152c.603-.807 2.532-2.514 5.482-3.16-.445-4.366 3.786-8.926 8.513-8.516l.002.001c.57-2.893 2.164-4.639 2.944-5.265l1.138 2.541 1.592.184.163 1.421 1.397.144.216 1.627zm-7.818 9.764c-2.334-1.25-4.173-2.995-5.408-5.285-.699 1.328-.876 3.054-.227 5.078-1.205.136-2.386.248-4.064.84l.549.187.149 1.269 1.439.167.147 1.425 1.29.17.2.59c.751-1.616.838-4.1.838-4.1 1.925.596 3.698.402 5.087-.341zm2.198-2.149c-2.514-1.334-4.291-3.16-5.451-5.318-.577.321-1.091.736-1.517 1.237 1.137 2.361 3.003 4.259 5.713 5.591.503-.422.928-.93 1.255-1.51zm.413-.91c.441-1.251.485-2.729 0-4.299 0 0 2.585-.105 4.1-.836l-.591-.2-.172-1.289-1.423-.148-.167-1.44-1.269-.148-.186-.549c-.695 1.601-.841 4.064-.841 4.064-1.515-.486-3.067-.45-4.403.025 1.156 2.124 2.851 3.685 4.952 4.82z"/></svg>'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = [candy];

let isPaused = false;
window.onblur = function () {
  isPaused = true;
}.bind(this);
window.onfocus = function () {
  isPaused = false;
}.bind(this);

let particles = [];

setInterval(function () {
  if (!isPaused) {
    particles.push(
    new Particle(data[randomInt(0, data.length - 1)], {
      "x": Math.random() * $(window).width(),
      "y": $(window).height() },
    1 + Math.random() * 3));

  }
}, 15);

function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  requestAnimationFrame(update.bind(this));
}
update();
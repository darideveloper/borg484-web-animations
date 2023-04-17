function App(current_canvas, num_burbles, cscale = chroma.scale([chroma.random(), chroma.random()])) {
  let width, height;
  const context = current_canvas.getContext('2d');

  const bubbles = [];

  init();
  return this;

  function init() {
    onResize();
    window.addEventListener('resize', onResize, false);

    for (let i = 0; i < num_burbles; i++) {
      initBubble(i);
    }

    document.addEventListener('click', () => {
      cscale = chroma.scale([chroma.random(), chroma.random()]);
    });

    animate();

  }

  function initBubble(i) {
    if (!bubbles[i]) bubbles[i] = { i };

    const b = bubbles[i],
      r = 1 + rnd() * 20,
      x = rnd() * width,
      dx = rnd(10, 20);

    b.r = r;
    b.x = x - dx;
    b.y = height + r * 2;
    b.color = cscale(rnd()).alpha(rnd(0.1, 0.8));

    const tweenx = gsap.to(b, {
      duration: 1 + rnd() * 2,
      x: b.x + dx,
      repeat: -1,
      yoyo: true,
      ease: Power0.easeNone
    });
    gsap.to(b, {
      duration: b.r * 0.5,
      y: -b.r,
      ease: Power2.easeIn,
      // ease: Power0.easeNone,
      onCompleteParams: [b, tweenx],
      onComplete: function (b) {
        tweenx.kill();
        initBubble(b.i);
      }
    });
  }

  function drawBubble(b) {
    context.beginPath();
    context.arc(b.x, b.y, b.r, 0, 2 * Math.PI, false);
    context.fillStyle = b.color;
    context.fill();

    context.beginPath();
    context.arc(b.x, b.y, b.r + 2, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = b.color;
    context.stroke();
  }

  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < num_burbles; i++) {
      drawBubble(bubbles[i]);
    }
  }

  function onResize() {
    width = current_canvas.parentNode.offsetWidth
    height = current_canvas.parentNode.offsetHeight
    current_canvas.width = width;
    current_canvas.height = height;
  }

  function rnd(min, max) {
    if (min === undefined) { min = 0; }
    if (max === undefined) { max = 1; }
    return Math.random() * (max - min) + min;
  }
}
const ball = document.querySelector(".discoball");

const radius = 75;

ball.style.width = `${2 * radius}px`;
ball.style.height = `${2 * radius}px`;
ball.style.marginLeft = `-${radius}px`;

const mirrorSize = radius / 7.5;
const rows = 19;
const angleIncLatitude = Math.PI / rows;

const colour = ball.classList.contains("rainbow") ? "rainbow" : "grey";

for (let a = 0; a < Math.PI; a += angleIncLatitude) {
  const z = radius * Math.cos(a);
  const r = radius * Math.sin(a);
  const circumference = 2 * Math.PI * r;

  //addCircles(z, r, a);

  const mirrorsInRow = Math.floor(circumference / (1.2 * mirrorSize));
  const angleIncRow = (2 * Math.PI) / mirrorsInRow;

  for (let b = 0; b < 2 * Math.PI; b += angleIncRow) {
    const x = r * Math.cos(b);
    const y = r * Math.sin(b);

    addMirror(x, y, z, a, b);
  }
}

function addMirror(x, y, z, a, b) {
  const mirror = document.createElement("DIV");
  mirror.classList.add("mirror");

  mirror.setAttribute("data-angle", a); // stored only to change the colour later depending on angle

  mirror.style.width = `${mirrorSize}px`;
  mirror.style.height = `${mirrorSize}px`;
  mirror.style.transform = `translateX(${
    radius + x - mirrorSize / 2
  }px) translateY(${
    radius + y - mirrorSize / 2
  }px) translateZ(${z}px) rotateZ(${b}rad) rotateY(${a}rad)`;

  mirror.style.backgroundColor = randomGreyColour(a);
  mirror.style.animation = addSparkle();

  ball.appendChild(mirror);
}

function randomColour(a, h) {
  const normal = Math.floor(Math.random() * 20) + 30;
  const bright = Math.floor(Math.random() * 50) + 30;
  const l = a > 1 && a < 2 ? bright : normal;
  return `hsl(${h}, 60%, ${l}%)`;
}

function rainbowColour(a) {
  const h = (360 * -a) / Math.PI;
  const normal = Math.floor(Math.random() * 20) + 30;
  const bright = Math.floor(Math.random() * 40) + 30;
  const l = a > 1 && a < 2 ? bright : normal;
  return `hsl(${h}, 100%, ${l}%)`;
}

function randomGreyColour(a) {
  const normal = Math.floor(Math.random() * 20) + 30;
  const bright = Math.floor(Math.random() * 50) + 30;
  const l = a > 1 && a < 2 ? bright : normal;
  return `hsl(0, 0%, ${l}%)`;
}

function addSparkle() {
  const delay = Math.floor(Math.random() * 3);
  const animation = `sparkle 3s ${delay}s infinite`;
  return animation;
}

function addCircles(z, r, a) {
  const circle = document.createElement("DIV");
  circle.style.width = `${2 * r}px`;
  circle.style.height = `${2 * r}px`;
  circle.style.borderRadius = "50%";
  circle.style.border = `3px solid ${rainbowColour(a)}`;
  circle.style.position = "absolute";
  circle.style.top = `${radius}px`;
  circle.style.left = `${radius}px`;
  circle.style.transform = `translateX(${-r}px) translateY(${-r}px) translateZ(${z}px)`;
  ball.appendChild(circle);
}

document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const mirrors = document.querySelectorAll(".mirror");
    const col = e.target.value;
    let h = col === "randomColour" ? Math.floor(Math.random() * 360) : 0;
    console.log(col);
    mirrors.forEach((m) => {
      const a = +m.dataset.angle;
      let colour;
      switch (col) {
        case "randomColour":
          colour = randomColour(a, h);
          break;
        case "rainbowColour":
          colour = rainbowColour(a);
          break;
        default:
          colour = randomGreyColour(a);
      }
      m.style.backgroundColor = colour;
    });
  })
);
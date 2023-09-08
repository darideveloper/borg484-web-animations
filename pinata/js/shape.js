let Bodies = Matter.Bodies

// Update candies images >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const textureIImages = [
  './imgs/candy1.png',
  './imgs/candy2.png',
  './imgs/candy3.png',
  './imgs/candy4.png',
  './imgs/candy5.png',
  './imgs/candy6.png',
  './imgs/candy7.png',
  './imgs/candy8.png',
  './imgs/candy9.png',
  './imgs/candy10.png',
]

// Update candy circle size >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const circleSize = 40

function getShape () {

  var bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8
  }

  let randomX = Math.floor(Math.random() * window.innerWidth)
  let randomY = Math.floor(Math.random() * window.innerHeight)
  let randomRadius = Math.floor(circleSize)

  let shape = Bodies.circle(randomX, randomY, randomRadius, bodyOptions)

  // Get a random texture image
  let randomTexture = textureIImages[Math.floor(Math.random() * textureIImages.length)]

  // Add texture to shape
  shape.render.sprite.texture = randomTexture

  return shape
}

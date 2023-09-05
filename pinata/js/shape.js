let Bodies = Matter.Bodies

function getShape () {

  var bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8
  }

  let randomX = Math.floor(Math.random() * window.innerWidth)
  let randomY = Math.floor(Math.random() * window.innerHeight)
  let randomRadius = Math.floor(Math.random() * 20) + 50

  // ------------- CHANGE THE SHAPE HERE!  -------------
  let shape = Bodies.circle(randomX, randomY, randomRadius, bodyOptions)
  // ----------------------------------------------------

  return shape
}

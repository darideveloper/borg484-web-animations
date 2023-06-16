const content = document.querySelector (".content")
const flagElem = document.querySelector (".flag")

// Animate flag with coursor position
content.addEventListener ("mousemove", (e) => {
  // Get mouse position and screen width
  const positionMouseX = e.clientX
  const screenWidth = window.innerWidth
  const center = screenWidth / 2

  // console.log (positionMouseX, center)

  // Detect left or right mouse position and animate
  if (positionMouseX < center) {
    content.setAttribute ("animation", "left")
  } else {
    content.setAttribute ("animation", "right")
  }
})
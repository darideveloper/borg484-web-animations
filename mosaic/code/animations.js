const bodyElem = document.querySelector ("body")
const flagElem = document.querySelector (".flag")

// Animate flag with coursor position
bodyElem.addEventListener ("mousemove", (e) => {
  // Get mouse position and screen width
  const positionMouseX = e.clientX
  const screenWidth = window.innerWidth
  const center = screenWidth / 2

  console.log (positionMouseX, center)

  // Detect left or right mouse position and animate
  if (positionMouseX < center) {
    flagElem.setAttribute ("animation", "left")
  } else {
    flagElem.setAttribute ("animation", "right")
  }
})
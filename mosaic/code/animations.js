const content = document.querySelector (".content")
const flagElem = document.querySelector (".flag")
const donationsWrapper = document.querySelector (".donations-wrapper")

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

// Make donations already rendered, visible
async function showDonations () {
  // Make donations visible, one by one
  const donationsElems = document.querySelectorAll ('.donation.hide')

  for (const donation of donationsElems) {
    await new Promise (resolve => setTimeout (resolve, 100))
    donation.classList.remove ('hide')
  }
}

// Auto scroll
function startAutoScroll () {

  anime({
    targets: donationsWrapper,
    keyframes: [
      {translateY: `-8vw`},
      {translateX: window.innerWidth - donationsWrapper.scrollWidth},
      {translateY: 0},
      {translateX: 0},
    ],
    duration: 10000,
    loop: true,
    direction: 'forwards',
    easing: 'easeInOutQuad',
  });
}
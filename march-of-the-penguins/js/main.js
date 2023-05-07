const donations = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

function init () {
  // Render penguins

  const penguinsContainer = document.querySelector ('.penguins')
  donations.forEach (donation => {

    const positionsY = [5, 10, 15, 20, 25, 30]

    // Calculate pinguin random options
    const hue = Math.floor (Math.random () * 80)
    const positionX = Math.random () > 0.5 ? 'left' : 'right'
    const positionYIndex = Math.floor (Math.random () * positionsY.length)
    const positionY = positionsY[positionYIndex]
    const zIndex = positionsY.length - positionYIndex  // calculate zindex based on positionY
    const size = Math.floor (Math.random () * 3) + 10
    console.log ({hue, positionX, positionY, size}) 
    
    // Render new penguin

    // html content
    const penguin = document.createElement ('img')
    penguin.src = './images/penguin.svg'
    penguin.alt = 'donation penguin'
    penguin.classList.add ('penguin')

    // Styles
    penguin.style.filter = `hue-rotate(${hue}deg)`
    penguin.style.zIndex = zIndex
    if (positionX === 'left') {
      penguin.style.left = '-13vw'
    } else {
      penguin.style.right = '-13vw'
    } 
    penguin.style.bottom = `${positionY}vh`
    penguin.style.width = `${size}vw`

    // Append to container
    penguinsContainer.appendChild (penguin)

    // Random animation time and delay
    const animationTime = Math.floor (Math.random () * 10000) + 5000
    const animationDelay = Math.floor (Math.random () * 10000)

    // Animate penguin
    anime({
      targets: penguin,
      translateX: positionX == 'left' ? '113vw' : '-113vw',
      duration: animationTime,
      delay: animationDelay,
      easing: 'linear',
    });
  })
}

init ()
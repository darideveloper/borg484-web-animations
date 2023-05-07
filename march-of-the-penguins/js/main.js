const donations = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

function init() {
  // Render penguins

  const penguinsContainer = document.querySelector('.penguins')
  donations.forEach(donation => {

    const positionsY = [5, 10, 15, 20, 25, 30]

    // Calculate pinguin random options
    const hue = Math.floor(Math.random() * 80)
    const positionX = Math.random() > 0.5 ? 'left' : 'right'
    const positionYIndex = Math.floor(Math.random() * positionsY.length)
    const positionY = positionsY[positionYIndex]
    const zIndex = positionsY.length - positionYIndex  // calculate zindex based on positionY
    const size = Math.floor(Math.random() * 3) + 10
    console.log({ hue, positionX, positionY, size })

    // Random animation time and delay
    const animationTime = Math.floor(Math.random() * 10000) + 5000
    const animationDelay = Math.floor(Math.random() * 10000)

    // html content of penguin
    const penguinWrapper = document.createElement('div')
    penguinWrapper.classList.add('penguin-wrapper')
    const penguin = document.createElement('img')
    penguin.src = './images/penguin.svg'
    penguin.alt = 'donation penguin'
    penguin.classList.add('penguin')

    // Styles
    penguinWrapper.style.filter = `hue-rotate(${hue}deg)`
    penguinWrapper.style.zIndex = zIndex
    if (penguinWrapper === 'left') {
      penguinWrapper.style.left = '-13vw'
    } else {
      penguinWrapper.style.right = '-13vw'
    }
    penguinWrapper.style.bottom = `${positionY}vh`
    penguinWrapper.style.width = `${size}vw`
    penguin.style.width = `100%`

    // Add walk animation
  penguin.style.animation = `walk ${animationTime / 10000 / 2 }s infinite alternate ease-in-out`

    // Append to container
    penguinWrapper.appendChild(penguin)
    penguinsContainer.appendChild(penguinWrapper)

    // Animate penguin
    anime({
      targets: penguinWrapper,
      translateX: positionX == 'left' ? '113vw' : '-113vw',
      duration: animationTime,
      delay: animationDelay,
      easing: 'linear',
    })
  })
}

init()
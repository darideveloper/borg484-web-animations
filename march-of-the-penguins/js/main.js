const donations = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

const minSize = 10
const maxSize = 15

function init() {
  // Render penguins with donations

  const penguinsContainer = document.querySelector('.penguins')
  donations.forEach(donation => {

    const positionsY = [5, 10, 15, 20, 25, 30]

    // Calculate pinguin random options
    const hue = Math.floor(Math.random() * 50)
    const positionX = Math.random() > 0.5 ? 'left' : 'right'
    const positionYIndex = Math.floor(Math.random() * positionsY.length)
    const positionY = positionsY[positionYIndex]
    const zIndex = positionsY.length - positionYIndex  // calculate zindex based on positionY
    const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize
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

    const text = document.createElement('p')
    const textDonor = document.createElement('span')
    const textAmount = document.createElement('span')
    textDonor.classList.add('donor')
    textAmount.classList.add('amount')
    text.classList.add('text')
    textDonor.innerText = 'Anonymous'
    textAmount.innerText = '1000'
    text.appendChild(textDonor)
    text.appendChild(textAmount)

    // Styles
    penguinWrapper.style.filter = `hue-rotate(${hue}deg)`
    penguinWrapper.style.zIndex = zIndex
    if (positionX === 'left') {
      penguinWrapper.style.left = `-${maxSize}vw`
    } else {
      penguinWrapper.style.right = `-${maxSize}vw`
    }
    penguinWrapper.style.bottom = `${positionY}vh`
    penguinWrapper.style.width = `${size}vw`
    penguin.style.width = `100%`

    // Add walk animation
    penguin.style.animation = `walk ${animationTime / 10000 / 2}s infinite alternate ease-in-out`

    // Append to container
    penguinWrapper.appendChild(penguin)
    penguinWrapper.appendChild(text)
    penguinsContainer.appendChild(penguinWrapper)

    // Animate penguin in loop
    const animation = anime({
      targets: penguinWrapper,
      translateX: positionX == 'left' ? `${100 + maxSize}vw` : `-${100 + maxSize}vw`,
      duration: animationTime,
      delay: animationDelay,
      easing: 'linear',
      loop: true,
      direction: 'alternate',
    })
  })
}


init()
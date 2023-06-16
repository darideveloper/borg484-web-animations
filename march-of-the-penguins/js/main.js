import { donations } from './api.js'

const size1 = 10
const size2 = 12
const size3 = 15

function init() {
  // Render penguins with donations

  const penguinsContainer = document.querySelector('.penguins')
  donations.forEach(({name, amount, imageUrl}) => {

    const positionsY = [5, 10, 15, 20, 25, 30]

    // Calculate pinguin random options
    const hue = Math.floor(Math.random() * 50)
    const positionX = Math.random() > 0.5 ? 'left' : 'right'
    const positionYIndex = Math.floor(Math.random() * positionsY.length)
    const positionY = positionsY[positionYIndex]
    const zIndex = positionsY.length - positionYIndex  // calculate zindex based on positionY
    let size = size1
    if (amount > 50) {
      size = size2
    }
    if (amount > 250) {
      size = 14
    }
    console.log({ hue, positionX, positionY, size })

    // Random animation time and delay
    const animationTime = Math.floor(Math.random() * 10000) + 5000
    const animationDelay = Math.floor(Math.random() * 10000)

    // Content of penguin
    const penguinWrapper = document.createElement('div')
    penguinWrapper.classList.add('penguin-wrapper')

    const content = document.createElement('div')
    content.classList.add('content')

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
    textDonor.innerText = name
    textAmount.innerText = `$${amount}`
    text.appendChild(textDonor)
    text.appendChild(textAmount)

    const image = document.createElement('img')
    image.src = imageUrl
    image.classList.add('photo')

    // Styles
    penguinWrapper.style.filter = `hue-rotate(${hue}deg)`
    penguinWrapper.style.zIndex = zIndex
    if (positionX === 'left') {
      penguinWrapper.style.left = `-${size3}vw`
    } else {
      penguinWrapper.style.right = `-${size3}vw`
    }
    penguinWrapper.style.bottom = `${positionY}vh`
    penguinWrapper.style.width = `${size}vw`
    content.style.width = `100%`
    content.style.height = `100%`
    penguin.style.width = `100%`

    text.style.fontSize = `${size/8}vw`
    text.style.marginTop = `${size/10*6}vw`

    image.style.filter = `hue-rotate(-${hue}deg)`
    image.style.width = `${size/10*3.8}vw`
    image.style.marginTop = `${size/10*0.8}vw`

    // Add walk animation
    content.style.animation = `walk ${animationTime / 10000 / 2}s infinite alternate ease-in-out`

    // Append to container
    content.appendChild(penguin)
    content.appendChild(text)
    content.appendChild(image)
    penguinWrapper.appendChild(content)
    penguinsContainer.appendChild(penguinWrapper)

    // Animate penguin in loop
    anime({
      targets: penguinWrapper,
      translateX: positionX == 'left' ? `${100 + size3}vw` : `-${100 + size3}vw`,
      duration: animationTime,
      delay: animationDelay,
      easing: 'linear',
      loop: true,
      direction: 'alternate',
    })
  })
}


init()
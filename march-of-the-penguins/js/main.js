const donations = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

function init () {
  // Render penguins

  const penguinsContainer = document.querySelector ('.penguins')
  donations.forEach (donation => {

    // Calculate pinguin random options
    const hue = Math.floor (Math.random () * 80)
    const positionX = Math.random () > 0.5 ? 'left' : 'right'
    const positionY = Math.floor (Math.random () * 20)
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
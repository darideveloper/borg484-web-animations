const donations = [{hello: "world"},{},{},{}]

function init () {
  // Render penguins

  const penguins_container = document.querySelector ('.penguins')
  donations.forEach (donation => {

    // Calculate random hue rotation and brightness
    const hue = Math.floor (Math.random () * 50)
    
    // Render new penguin
    // const penguin_image = `<img src="./images/penguin.svg" alt="donation penguin" class="penguin">`
    const penguin = document.createElement ('img')
    penguin.src = './images/penguin.svg'
    penguin.alt = 'donation penguin'
    penguin.classList.add ('penguin')
    penguin.style.filter = `hue-rotate(${hue}deg)`
    penguins_container.appendChild (penguin)
  })
}

init ()
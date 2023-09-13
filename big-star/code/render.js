let donations = []
const popup = document.querySelector('.popup-wrapper')
const cardsWrapper = document.querySelector('.cards .swiper-wrapper')

function renderDots() {
  // Reneder dots over star line guides

  const lines = document.querySelectorAll('.line')
  lines.forEach(line => {

    // Get the line size (max of width and height)
    const lineWidth = line.getBoundingClientRect().width
    const lineHeight = line.getBoundingClientRect().height
    const lineSize = Math.max(lineWidth, lineHeight)

    // Calculate the number of dots in each line
    const dosNum = Math.floor(lineSize / 10)

    // Render dots
    for (let i = 0; i < dosNum; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.classList.add('inactive')
      line.appendChild(dot)

      // Set dot position
      const middle = document.createElement('div')
      middle.classList.add('middle')
      dot.appendChild(middle)
    }
  })
}

async function renderDonations() {
  // Render donations in random dots

  // Get donations from api and filter new donations
  let newDonations = await getDonations()
  newDonations = newDonations.filter(donation => !donations.includes(donation))
  console.log (newDonations)

  // Query dots
  const dots = document.querySelectorAll('.dot')

  // Activate random dots for each donation
  newDonations.forEach(donation => {

    // Activate random dot
    const randomIndex = Math.floor(Math.random() * dots.length)
    const randomDot = dots[randomIndex]
    randomDot.classList.remove('inactive')
    randomDot.classList.add('active')

    // Set donation name
    randomDot.setAttribute('donor', donation)

    // Show popup on mouseover
    randomDot.addEventListener('mouseover', e => {

      // Get dot absolute position in screen
      const dotRect = randomDot.getBoundingClientRect()
      const dotX = dotRect.x
      const dotY = dotRect.y

      // Move popup to dot position
      popup.style.left = `${dotX}px`
      popup.style.top = `${dotY}px`

      // Activate popup
      popup.classList.remove('inactive')

      // Change name in popup
      const donor = randomDot.getAttribute('donor')
      const popupName = document.querySelector('p')
      popupName.textContent = donor
    })

    // Hide popup on mouseout
    randomDot.addEventListener('mouseout', e => {
      popup.classList.add('inactive')
    })

    // Add card to slider
    const card = `<div class="swiper-slide">
      <div class="img-wrapper">
        <img src="./imgs/light.webp" alt="light">
        <p class="name">${donation}</p>
      </div>
    </div>`

    // Append regular and new slides
    // if (donations.length == 0) {
    swiper.appendSlide(card)
    // }
    // else {
    //   swiper.prependSlide(card)
    // }

    // Change color of image wrapper 
    const currentCard = cardsWrapper.querySelector('.swiper-slide:last-child')
    const imgWrapper = currentCard.querySelector('.img-wrapper')
    const randomColorRgba = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    imgWrapper.style.backgroundColor = randomColorRgba

    // Merge new donations with old donations
    donations = donations.concat(newDonations)
  })
}

// Render 
renderDots()
renderDonations()

// Render new donations every 5 seconds
setInterval(renderDonations, 5000)
class Render {


/**
 * Description
 * @param {array} buildingImages (array of image urls)
 * @param {integer} maxDonationsAmount (max amount of donations to render)
 */
 constructor(buildingImages, maxDonationsAmount) {

    // Donations data
    this.donations = []
    this.donationsRenderedIds = []
    this.totalAmount = 0

    // Elenments
    this.donationsContainer = document.querySelector('.swiper-wrapper')
    this.swiperElem = document.querySelector('.swiper')
    this.bgElem = document.querySelector('.bg')
    this.towerElem = document.querySelector('.tower')

    // Save class data
    this.buildingImages = buildingImages
    this.maxDonationsAmount = maxDonationsAmount
    
    // Control variable
    this.initialsRendered = false

    // Remove bg blur
    setTimeout(() => {
      this.bgElem.classList.remove('blur')
    }, 1000)

    // Render initial donations and start loop
    setTimeout(() => {

      // Render initial donations
      this.renderInitialDonations ()
      this.initialsRendered = true

      // Init swiper
      this.swiper = new Swiper(".swiper", {
        slidesPerView: 6,
        autoplay: { delay: 2000 },
      })

      // Show swiper
      this.swiperElem.classList.remove('transparent')

      // Render donations in loop
      this.renderLoop()

    }, 2000)

    // Show tower
    setTimeout(() => {
      this.towerElem.classList.remove('transparent')
    }, 3000)
  }

  /**
   * Description
   * @param {string} donorName
   * @param {integer} amount
   * @param {string} logo (image url)
   */
  addDonation(name, amount, logo, id) {
    this.donations.push({ name, amount, logo, id})
  }

  /**
   * Render a random donation 
   */
  renderNextDonation() {
    // Filter no rendered donations
    const noRenderedDonationsIds = this.donations.filter(donation => !this.donationsRenderedIds.includes(donation.id))

    // Skip if no donation
    if (noRenderedDonationsIds.length === 0) {
      console.log('No more donations to render')
      return null
    }

    // Get random donation
    const donation = noRenderedDonationsIds[Math.floor(Math.random() * noRenderedDonationsIds.length)]
    
    // increase main building size
    this.totalAmount += donation.amount
    const percentage = this.totalAmount / this.maxDonationsAmount * 100
    this.towerElem.style.transform = `scaleY(${percentage / 100})`

    // Get random building image
    const buildingImage = this.buildingImages[Math.floor(Math.random() * this.buildingImages.length)]

    // Add donation to swiper
    const donationElem = `
      <div class="donation swiper-slide">
        <img class="logo" src="${donation.logo}" alt="${donation.name} logo">
        <img class="building" src="${buildingImage}" alt="Building photo">
        <p class="">${donation.name}</p>
      </div>
    `
    if (this.initialsRendered) {
      this.swiper.appendSlide(donationElem)
    } else {
      // Insert donation to html
      this.donationsContainer.innerHTML += donationElem
    }

    console.log(`Donation rendered ${donation.id}`)

    // Save donation id
    this.donationsRenderedIds.push(donation.id)

    // Change randomly the huw of the last building image
    const lastBuildingImage = document.querySelector('.donation:last-child .building')
    const hue = Math.floor(Math.random() * 360)
    lastBuildingImage.style.filter = `hue-rotate(${hue}deg)`

  }

  /**
   * Render donations in loop (every 5 seconds)
   */
  renderLoop() {
    setInterval(() => {
      this.renderNextDonation()
    }, 1000)
  }

  /**
   * Render initial donations without waiting time
   */
  renderInitialDonations() {
    this.donations.forEach(() => {
      this.renderNextDonation()
    })
  }
}



class Render {

  constructor() {
    // Donotations data
    this.donations = []
    this.renderedDonationsIds = []

    // Html elements
    this.donationUpperWrapper = document.querySelector('.donations-upper')

    // Init swiper
    this.swiper = new Swiper(".swiper", {
      slidesPerView: 10,
      spaceBetween: 30,
      autoplay: { delay: 1000 },
    })

    // Load initial data
    setTimeout(() => {
      this.renderInitialLower()
      this.renderInitialUpper()
    }, 100)

    // Constrol variable to stwitch frames
    this.lastFrame = 'left'

    // Render new donations in loop
    this.renderLoopLower()
    this.renderLoopUpper()
  }


  /**
   * Add donot to donors data
   * @param {string} amount - the amount the user wants to donate
   * @param {int} intAmount - the amount the user wants to donate as an integer
   * @param {string} dedicationImageUrl - the url of the dedication image
   * @param {string} name - the name of the donor
   * @param {string} id - the id of the donor
   * @param {int} paid - 0 or 1
   * @param {integer} donor - the id of the donor
   */
  addDonation(amount, intAmount, dedicationImageUrl, name, id, paid, donor) {
    this.donations.push({
      amount,
      intAmount,
      dedicationImageUrl,
      name,
      id,
      paid,
      donor
    })
    console.log (`added donation: ${id}`)
  }

  /**
   * Get the next donation to render, upper 100 usd
   */
  getNextUpperDonation() {
    const donationsUpper = this.donations.filter(donation => donation.intAmount >= 100)
    const donationsNoRendered = donationsUpper.filter(donation => !this.renderedDonationsIds.includes(donation.id))
    if (donationsNoRendered.length > 0) {
      // Return random donation
      return donationsNoRendered[Math.floor(Math.random() * donationsNoRendered.length)]
    } else {
      return {}
    }
  }

  /**
   * Get the next donation to render, lower 100 usd
   */
  getNextLowerDonation() {
    const donationsLower = this.donations.filter(donation => donation.intAmount < 100)
    const donationsNoRendered = donationsLower.filter(donation => !this.renderedDonationsIds.includes(donation.id))
    if (donationsNoRendered.length > 0) {
      // Return random donation
      return donationsNoRendered[Math.floor(Math.random() * donationsNoRendered.length)]
    } else {
      return {}
    }
  }

  /**
   * Render the next lower donations (add it to the slider)
   */
  renderNextLower() {

    // Get donation data
    const donation = this.getNextLowerDonation()

    // Add donation to wrapper
    if (!donation.id) {
      return
    }

    const donationElem = `
      <div class="donation swiper-slide">
        <img class="" src="${donation.dedicationImageUrl}" alt="${donation.name} photo">
        <p class="">${donation.name}</p>
      </div>
    `
    this.swiper.appendSlide(donationElem)

    // Add donation id to rendered donations
    this.renderedDonationsIds.push(donation.id)

    // Debug
    console.log(`rendered lower donation: ${donation.id}`)
  }

  /**
   * Render the next upper donations
   * @param {string} position - frame to render the donation ('left' or 'right')
   */
  renderNextUpper(position) {

    // Get donation data
    const donation = this.getNextUpperDonation()

    if (!donation.id) {
      return
    }

    // Get frame
    const frame = this.donationUpperWrapper.querySelector(`.donation.${position}`)

    // Hide
    frame.classList.add ("transparent")

    // Delete previous donation and add new one
    setTimeout(() => {
      frame.innerHTML = ''
      const donationElem = `
        <div class="img-wrapper">
          <img class="" src="${donation.dedicationImageUrl}" alt="${donation.name} photo">
        </div>
        <p class="">${donation.name}</p>
      `
      frame.innerHTML = donationElem
  
      // Add donation id to rendered donations
      this.renderedDonationsIds.push(donation.id)
    }, 500)

    setTimeout(() => {
      frame.classList.remove ("transparent")
    }, 1000)
  }

  /**
   * Render all initial lower donations
   */
  renderInitialLower() {
    for (let i = 0; i < 20; i++) {
      this.renderNextLower()
    }
  }

  /**
   * Render all initial upper donations
   */
  renderInitialUpper() {
    this.renderNextUpper('left')
    this.renderNextUpper('right')
  }


  /**
   * Render new lower donation in loop
   */
  renderLoopLower() {
    setInterval(() => {
      this.renderNextLower()
    }, 3000)
  }

  /**
   * Render new upper donation in loop
   */
  renderLoopUpper() {
    setInterval(() => {
      // Select random "left" or "right" frame
      let frame = "right"
      if (this.lastFrame === "right") {
        frame = "left"
      }
      this.renderNextUpper(frame)
      this.lastFrame = frame
    }, 6000)
  }

}
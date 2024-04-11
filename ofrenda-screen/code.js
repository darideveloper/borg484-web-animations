


class Render {

  constructor() {
    // Donotations data
    this.donations = []
    this.renderedDonationsIds = []

    // Videos elemns
    this.videoBlink = document.querySelector('video.blink')
    this.videoBlow = document.querySelector('video.blow')

    // Butterfly elemnts
    this.butterfliesWrapper = document.querySelector('.butterflies-wrapper')
    this.butterflies = []

    // Playing video control variable
    this.playingVideo = false

    // Html elements
    this.donationUpperWrapper = document.querySelector('.donations-upper')

    // Init swiper
    this.swiper = new Swiper(".swiper", {
      slidesPerView: 10,
      autoplay: { delay: 1000 },
    })

    // Load initial data
    this.initialLowerRendered = false
    this.initialUpperRendered = false
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

    // Save donation
    this.donations.push({
      amount,
      intAmount,
      dedicationImageUrl,
      name,
      id,
      paid,
      donor
    })

    console.log(`added donation: ${id}`)

    // Add new butterfly
    const butterfly = new Butterfly()
    butterfly.init()
    butterfly.moveButterfly()
    this.butterflies.push(butterfly)
    console.log (this.butterflies)

    // Change videos when donation comes, only if initial data is loaded
    // or if the video is not playing
    if (!this.initialLowerRendered || !this.initialUpperRendered || this.playingVideo) {
      return
    }

    this.playingVideo = true

    // Restart blow video
    this.videoBlow.currentTime = 0
    this.videoBlow.play()

    // Show blink video
    this.videoBlow.classList.remove('transparent')
    this.videoBlink.classList.add('transparent')

    // Show butterflies
    this.butterfliesWrapper.classList.remove('transparent')

    // Hide video after 6s
    setTimeout(() => {

      // Hide blow video
      this.videoBlow.classList.add('transparent')
      this.videoBlink.classList.remove('transparent')

      // Hide butterflies
      this.butterfliesWrapper.classList.add('transparent')

      this.playingVideo = false
    }, 6000)


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
    frame.classList.add("transparent")

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
      frame.classList.remove("transparent")
    }, 1000)
  }

  /**
   * Render all initial lower donations
   */
  renderInitialLower() {
    for (let i = 0; i < 20; i++) {
      this.renderNextLower()
    }
    this.initialLowerRendered = true
  }

  /**
   * Render all initial upper donations
   */
  renderInitialUpper() {
    this.renderNextUpper('left')
    this.renderNextUpper('right')
    setTimeout(() => {
      this.initialUpperRendered = true
    }, 1500)
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

// butterflies animations from
// https://codepen.io/rachsmith/pen/AeEmXG
function Butterfly() {
  var _this = this

  _this.init = function () {
    _this.x = Math.floor(Math.random() * window.innerWidth)
    _this.y = Math.floor(Math.random() * window.innerHeight);;
    _this.directionX = true
    _this.directionY = true

    _this.domElement = document.createElement('div')
    _this.domElement.className = 'butterfly'
    _this.domElement.innerHTML = '<div class="left-wing"><div class="top"></div><div class="bottom"></div></div><div class="right-wing"><div class="top"></div><div class="bottom"></div></div>'
    document.querySelector('.butterflies-wrapper').appendChild(_this.domElement)

  }

  _this.moveButterfly = function () {
    _this.domElement.style.webkitTransform = 'translate3D(' + _this.x + 'px, ' + _this.y + 'px, 0px) rotate3d(1, 0.5, 0, 110deg)'
    var randomnumberX = Math.floor(Math.random() * 11)
    var randomnumberY = Math.floor(Math.random() * 11)
    if (randomnumberX > 8) {
      _this.directionX = _this.directionX * -1
    }

    if (randomnumberY > 8) {
      _this.directionY = _this.directionY * -1
    }

    if (_this.directionX == true) {
      _this.x = _this.x + 1
    } else {
      _this.x = _this.x - 1
    }

    if (_this.directionY == true) {
      _this.y = _this.y + 1
    } else {
      _this.y = _this.y - 1
    }

  }

  return _this
}
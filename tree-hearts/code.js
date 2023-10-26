class Render {

  /**
   * 3D setup abd manage donations
   */
  constructor() {

    // Setup ed animation
    var supports3DTransforms = document.body.style['perspectiveProperty'] !== undefined ||
      document.body.style['WebkitPerspective'] !== undefined ||
      document.body.style['MozPerspective'] !== undefined ||
      document.body.style['msPerspective'] !== undefined ||
      document.body.style['OPerspective'] !== undefined

    if (!supports3DTransforms) {
      alert('Your browser doesn\'t support CSS3 3D transforms :/')
    }

    this.width = 250
    this.height = 300

    this.tree = document.querySelector('.tree')

    this.tree.style.width = this.width + 'px'
    this.tree.style.height = this.height + 'px'

    // resize when screen size change
    window.addEventListener('resize', this.resize, false)

    // Resize when load
    this.resize()

    // Elements
    this.donationsContainer = document.querySelector('.swiper-wrapper')
    this.swiperElem = document.querySelector('.swiper')

    // Donations data
    this.numDonationsTop = 20
    this.donations = []
    this.donationsTop = []

    // Render initial donations and start loop
    this.initialsRendered = false
    setTimeout(() => {

      // Init swiper
      this.initiSwiper ()

      // Render initial donations
      for (const donation of this.donationsTop) {
        this.sliderRenderDonation(donation.name, donation.image, donation.amount)
      }

      // Show swiper
      this.swiperElem.classList.remove('transparent')

      this.initialsRendered = true

    }, 2000)
  }

/**
 * Initialize swiper and save as class variable this.swiper
 */
initiSwiper() {
    // Init swiper
    this.swiper = new Swiper(".swiper", {
      slidesPerView: 12,
      autoplay: { delay: 2000 },
    })
  }

  /**
   * Fize size of the wrapper
   */
  resize() {
    this.tree.style.top = ((window.innerHeight - this.height - 20) / 2) + 'px'
  }

  /**
   * Apply transform values to element
  */
  transform(element, value) {
    element.style.WebkitTransform = value
    element.style.MozTransform = value
    element.style.msTransform = value
    element.style.OTransform = value
    element.style.transform = value
  }

  /**
   * Render new donation
   * @param {str} name donor name
   * @param {int} amount donation amount
   * @param {str} image donor image url
  */
  addDonation(name, amount, image) {

    // Create img tag
    var element = document.createElement('img')
    element.setAttribute('src', './imgs/heart.png')
    element.classList.add("heart-img")

    // Place image
    var spread = this.width * 4

    var x = Math.round(Math.random() * spread) - (spread / 4),
      y = Math.round(Math.random() * this.height),
      z = Math.round(Math.random() * spread) - (spread / 2)

    var rx = 0,
      ry = Math.random() * 360,
      rz = 0

    if (Math.random() > 0.5) element.setAttribute('checked', '')
    this.transform(element, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)')
    this.tree.appendChild(element)

    // Save donation in list
    this.donations.push({ name, amount, image })

    // Direct save new donation in top
    let manualAdded = false
    if (this.donationsTop.length < this.numDonationsTop) {
      this.donationsTop.push({ name, amount, image })

      console.log ('donation added to top')
    
      // Add new donation in top an remove last
    } else if (this.donationsTop[this.donationsTop.length - 1].amount < amount) {
      
      this.donationsTop.push({ name, amount, image })
      this.donationsTop = this.donationsTop.sort((a, b) => {
        return b.amount - a.amount
      })
      this.donationsTop.pop()
      
      manualAdded = true

      console.log ('donation added to top')
    }

    // Short donation by amount
    this.donationsTop = this.donationsTop.sort((a, b) => {
      return b.amount - a.amount
    })

    // Render all top donations again
    if (manualAdded) {
      this.sliderRenderTop ()
    }

    console.log(`donation added ${name} ${amount} ${image}`)
  }

  /**
   * Add single donation to slider
   * @param {str} name donor name
   * @param {str} image donot image url
   * @param {int} amount donation amount
   * @returns {any}
   */
  sliderRenderDonation(name, image, amount) {

    // Add donation to swiper
    const donationElem = `
    <div class="donation swiper-slide">
      <img class="photo" src="${image}" alt="${name} photo">
      <img class="heart" src="./imgs/heart-empty.png" alt="heart">
      <p class="name">${name}</p>
      <p class="amount">$ ${amount}</p>
    </div>
  `
    if (this.initialsRendered) {
      // Append donation to swiper
      this.swiper.appendSlide(donationElem)

    } else {
      // Insert donation to html
      this.donationsContainer.innerHTML += donationElem
    }
  }

  /**
   * Delete ald donations and render newones in slider
   */
  sliderRenderTop() {

    // Skip if swiper not init
    if (!this.initialsRendered) return

    // Add transparent class
    this.swiperElem.classList.add('transparent')

    setTimeout(() => {

      // Remove all donations from slider
      this.swiper.removeAllSlides();
      this.swiper.autoplay.stop()

      // Add new donations to slider
      for (const donation of this.donationsTop) {
        this.sliderRenderDonation(donation.name, donation.image, donation.amount)
      }

      // Restart swiper
      this.initiSwiper ()

      setTimeout(() => {
        // Remove transparent class
        this.swiperElem.classList.remove('transparent')

        console.log ('top donations rendered')
      }, 500)


    }, 300)


  }
}

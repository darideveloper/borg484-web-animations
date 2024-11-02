

class CloudsManager {

  /**
   * Constructor. Initiall clouds data
   **/
  constructor() {
    // Donors data: name, sizie and image
    this.donnors = []

    // Clouds settings
    this.sizes = [1, 2, 3, 4]
    this.lines = [1, 2, 3, 4]

    // Coulds wrappers
    this.cloudBgWrapper = document.querySelector('.clouds-bg')
    this.cloudsDonationsWrapper = document.querySelector('.clouds-donation')

    // Animations settings
    this.baseTime = 12000
    this.speeds = {
      "empty": 0.4,
      "donation": 0.6
    }
    this.freeLines = {
      "empty": this.lines,
      "donation": this.lines
    }
    this.coudsCounters = {
      "empty": 0,
      "donation": 0
    }
    this.screenWidth = window.innerWidth

  }

  /**
   * Start animation for a cloud
   * @param {str} id - cloud id
   * @param {str} type - cloud type (empty or donation)
   * @param {bool} fast - fast animation
   */
  animateCloud(id, type, fast = false) {
    // Anime cloud
    const animClass = fast ? 'animate-fast' : 'animate-slow'
    const waitTime = this.coudsCounters[type] * 3500
    setTimeout(() => {
      const elem = document.getElementById(id)
      elem.classList.add(animClass)
    }, waitTime)
  }

  /**
   * Get a random line for a new cloud
   * @param {str} type - cloud type (empty or donation)
   * 
   * @returns {int} random line number
   */
  getRandomLine(type) {
    // Select one of the free lines
    if (this.freeLines[type].length === 0) {
      this.freeLines[type] = this.lines
    }
    const randomLine = this.freeLines[type][Math.floor(Math.random() * this.freeLines[type].length)]
    this.freeLines[type] = this.freeLines[type].filter(line => line !== randomLine)

    return randomLine
  }

  /**
   * Get a random id text for a new cloud
   * 
   * @returns {str} random id
   */
  getRandomId () {
    return Math.random().toString(36).substring(2, 15)
  }

  /**
   * Add a new empty cloud (witgout donor)
   */
  addEmptyCloud() {
    
    // Ramdom values
    const randomSize = this.sizes[Math.floor(Math.random() * this.sizes.length)]
    const randomLine = this.getRandomLine("empty")
    const randomId = this.getRandomId()
    
    // Create cloud (with random size and line)
    const cloudElem = `
      <div class="cloud-wrapper bg size-${randomSize} line-${randomLine}" id="${randomId}">
        <img src="./images/cloud.webp" alt="empty cloud" class="empty cloud">
      </div>
    `
    this.cloudBgWrapper.innerHTML += cloudElem

    // Start animation
    this.animateCloud(randomId, "empty")
    this.coudsCounters.empty += 1
  }

  /**
   * Add a new donation cloud
   */
  addDonationCloud(size, photoSrc, name, job) {

    // Get random values
    const randomLine = this.getRandomLine("empty")
    const randomId = this.getRandomId()

    // Create donation cloud
    const cloudElem = `
      <div class="cloud-wrapper donation size-${size} line-${randomLine}" id="${randomId}">
        <div class="image-mask">
          <img src="${photoSrc}" alt="donation cloud" class="donation cloud" />
        </div>
        <p>
          <span class="name title">${name}</span>
          <span class="job">${job}</span>
        </p>
      </div>
    `
    this.cloudsDonationsWrapper.innerHTML += cloudElem

    // Start animation
    this.animateCloud(randomId, "donation", true)
    this.coudsCounters.donation += 1
  }
}

// Start clouds manager and create bg clouds
const cloudsManager = new CloudsManager()

const cloundsAmount = 4
for (let i = 0; i < cloundsAmount; i++) {
  cloudsManager.addEmptyCloud()
}

// Add donations
cloudsManager.addDonationCloud(1, "./images/client-photo.webp", "Noah Martinez", "Future Scientist")
cloudsManager.addDonationCloud(2, "./images/client-photo.webp", "Alice Johnson", "Future Doctor")
cloudsManager.addDonationCloud(3, "./images/client-photo.webp", "Oliver Brown", "Future Engineer")
cloudsManager.addDonationCloud(1, "./images/client-photo.webp", "Emma Wilson", "Future Artist")
cloudsManager.addDonationCloud(4, "./images/client-photo.webp", "James Moore", "Future Developer")
cloudsManager.addDonationCloud(2, "./images/client-photo.webp", "Sophia Taylor", "Future Designer")
cloudsManager.addDonationCloud(3, "./images/client-photo.webp", "William Anderson", "Future Manager")
cloudsManager.addDonationCloud(1, "./images/client-photo.webp", "Isabella Thomas", "Future Writer")


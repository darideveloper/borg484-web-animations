

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

    // Bottom names
    this.bottomNames = []
    this.namesWrapper = document.querySelector('.bottom-names > marquee')
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
    const waitTime = this.coudsCounters[type] * 5000
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
   * 
    * @param {int} size - cloud size (1-4)
    * @param {str} photoSrc - donor photo source
    * @param {str} name - donor name
   */
  addDonationCloud(size, name, photoSrc) {

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
        </p>
      </div>
    `
    this.cloudsDonationsWrapper.innerHTML += cloudElem

    // Start animation
    this.animateCloud(randomId, "donation", true)
    this.coudsCounters.donation += 1
  }

  /**
   * Add bottom name
   * 
   * @param {str} name - donor name
   */
  addBottomName(name) {
    this.bottomNames.push(name)
    const nameElem = `<span class="name">&#9679; ${name}</span>`
    this.namesWrapper.innerHTML += nameElem
  }

  /**
   * Add text or image donation
   * 
   * @param {str} name - donor name
   * @param {str} photoSrc - donor photo source (default "")
   * @param {int} size - cloud size (default 0, 1-4)
   */
  addDonation(name, photoSrc = "", size = 0) {
    if (photoSrc !== "" && size > 0) {
      // Rener cloud donation
      this.addDonationCloud(size, name, photoSrc)
    } else {
      // Render text donation
      this.addBottomName(name)
    }
  }
}

// Start clouds manager and create bg clouds
const cloudsManager = new CloudsManager()
const cloundsAmount = 4
for (let i = 0; i < cloundsAmount; i++) {
  cloudsManager.addEmptyCloud()
}

// Render donations
cloudsManager.addDonation("Ethan White")
cloudsManager.addDonation("Olivia Harris", "./images/client-photo.webp", 2)
cloudsManager.addDonation("Mason Martinez")
cloudsManager.addDonation("Sophia Johnson", "./images/client-photo.webp", 3)
cloudsManager.addDonation("Elijah Brown")
cloudsManager.addDonation("Ava Wilson", "./images/client-photo.webp", 1)
cloudsManager.addDonation("Michael Moore")
cloudsManager.addDonation("Emily Taylor", "./images/client-photo.webp", 4)
cloudsManager.addDonation("Alexander Anderson")
cloudsManager.addDonation("Mia Thomas", "./images/client-photo.webp", 2)
cloudsManager.addDonation("Benjamin White")
cloudsManager.addDonation("Charlotte Harris", "./images/client-photo.webp", 3)
cloudsManager.addDonation("Daniel Martinez")
cloudsManager.addDonation("Amelia Johnson", "./images/client-photo.webp", 1)
cloudsManager.addDonation("Henry Brown")
cloudsManager.addDonation("Harper Wilson", "./images/client-photo.webp", 4)
cloudsManager.addDonation("Matthew Moore")
cloudsManager.addDonation("Ella Taylor", "./images/client-photo.webp", 2)
cloudsManager.addDonation("Jackson Anderson")
cloudsManager.addDonation("Scarlett Thomas", "./images/client-photo.webp", 3)
cloudsManager.addDonation("David White")
cloudsManager.addDonation("Victoria Harris", "./images/client-photo.webp", 1)

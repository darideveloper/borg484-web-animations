
class Dots {
  
  constructor() {
    this.dotsWrapper = document.querySelector('.dots')
    this.maxDots = 850
    this.requiredDots = 317
    this.marquee = document.querySelector('marquee')
  }

  /**
   * Create dots grid
   */
  createDots() {
    for (let i = 0; i < this.maxDots; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      this.dotsWrapper.appendChild(dot)
    }
  }

  /**
   * 
   * Validate if an element is over a specific group of valid divs
   * 
   * @param {node} mainElement - element to check
   * @param {array[node]} validDivs - divs that are valid to be over
   * @returns {boolean} - true if it's over a valid div, false otherwise
   */
  isOverValidDiv(mainElement, validDivs) {
    // Get the bounding rectangle of the main element
    const mainRect = mainElement.getBoundingClientRect()

    // Helper function to check overlap
    const isOverlapping = (rect1, rect2) => {
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      )
    }

    // Check if it's overlapping any valid div
    for (let validDiv of validDivs) {
      const validRect = validDiv.getBoundingClientRect()
      if (isOverlapping(mainRect, validRect)) {
        return true // It's over a valid div and no invalid divs
      }
    }

    // Default: not over any valid div
    return false
  }

  /**
   * show initial dots
   */
  draw100() {

    // Draw dots over number
    const dots = document.querySelectorAll('.dot')
    const validDivs = document.querySelectorAll('.over')
    const invalidDivs = document.querySelectorAll('.not-over')
    for (const dot of dots) {
      const dotOver = this.isOverValidDiv(dot, validDivs, invalidDivs)
      if (dotOver) {
        dot.classList.add('over')
      }
    }

    // Calculate missing or extra dots
    const createdDots = document.querySelectorAll('.dot.over')
    const allDots = document.querySelectorAll('.dot')
    const dotsDiff = this.requiredDots - createdDots.length
    const dotsDiffAbs = Math.abs(dotsDiff)

    const fixPoints = {
      "add": [782, 783, 812, 813, 90, 120, 150, 180],
      "remove": [0, 5, 6, 7, 8]
    }

    // Fix missing points
    for (let dotInex = 0; dotInex < dotsDiffAbs; dotInex++) {
      if (dotsDiff > 0) {
        const dot = allDots[fixPoints["add"][dotInex]]
        dot.classList.add('over')
      } else if (dotsDiff < 0) {
        const dot = createdDots[fixPoints["remove"][dotInex]]
        dot.classList.remove('over')
      }
    }

    // Debug info
    const finalDots = document.querySelectorAll('.dot.over')
    console.log({ createdDots, "requiredDots": this.requiredDots, dotsDiff, finalDots })
  }

  addDonation(companyName, imageSrc) {

    // Activate next dot
    const inactiveDots = document.querySelectorAll('.dot.over:not(.active)')
    console.log({ inactiveDots })
    const firstInactiveDot = inactiveDots[0]
    if (firstInactiveDot) {
      firstInactiveDot.classList.add('active')
    }

    // Update marquee
    this.marquee.innerHTML += `<div>
      <div class="content">
        <img src="${imageSrc}" alt="logo of ${companyName}" />
        <span>${companyName}</span>
      </div>
    </div>`
  }
}




// Create dots grid
const dotsManager = new Dots()
dotsManager.createDots()
dotsManager.draw100()

// ======================== EDIT THIS ========================
// Add donations
setTimeout(() => {
  dotsManager.addDonation("Test Company A", "./imgs/logo.png")
}, 1000)

setTimeout(() => {
  dotsManager.addDonation("Test Company B", "./imgs/logo.png")
}, 2000)

setTimeout(() => {
  dotsManager.addDonation("Test Company C", "./imgs/logo.png")
}, 3000)

setTimeout(() => {
  dotsManager.addDonation("Test Company D", "./imgs/logo.png")
}, 5000)

setTimeout(() => {
  dotsManager.addDonation("Test Company E", "./imgs/logo.png")
}, 8000)

setTimeout(() => {
  dotsManager.addDonation("Test Company F", "./imgs/logo.png")
}, 8000)

setTimeout(() => {
  dotsManager.addDonation("Test Company G", "./imgs/logo.png")
}, 9000)

setTimeout(() => {
  dotsManager.addDonation("Test Company H", "./imgs/logo.png")
}, 9500)

setTimeout(() => {
  dotsManager.addDonation("Test Company I", "./imgs/logo.png")
}, 10000)

setTimeout(() => {
  dotsManager.addDonation("Test Company J", "./imgs/logo.png")
}, 11000)

setTimeout(() => {
  dotsManager.addDonation("Test Company K", "./imgs/logo.png")
}, 12000)

setTimeout(() => {
  dotsManager.addDonation("Test Company L", "./imgs/logo.png")
}, 13000)

setTimeout(() => {
  dotsManager.addDonation("Test Company M", "./imgs/logo.png")
}, 13500)

setTimeout(() => {
  dotsManager.addDonation("Test Company N", "./imgs/logo.png")
}, 15000)

setTimeout(() => {
  dotsManager.addDonation("Test Company O", "./imgs/logo.png")
}, 15500)

setTimeout(() => {
  dotsManager.addDonation("Test Company P", "./imgs/logo.png")
}, 18000)

setTimeout(() => {
  dotsManager.addDonation("Test Company Q", "./imgs/logo.png")
}, 20000)

setTimeout(() => {
  dotsManager.addDonation("Test Company H", "./imgs/logo.png")
}, 23000)

setTimeout(() => {
  dotsManager.addDonation("Test Company I", "./imgs/logo.png")
}, 25000)

setTimeout(() => {
  dotsManager.addDonation("Test Company J", "./imgs/logo.png")
}, 28000)
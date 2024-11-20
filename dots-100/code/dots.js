
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

  addDonation(companyName) {

    // Activate next dot
    const inactiveDots = document.querySelectorAll('.dot.over:not(.active)')
    console.log({ inactiveDots })
    const firstInactiveDot = inactiveDots[0]
    if (firstInactiveDot) {
      firstInactiveDot.classList.add('active')
    }

    // Update marquee
    this.marquee.innerHTML += `<span>${companyName}</span>`
  }
}




// Create dots grid
const dotsManager = new Dots()
dotsManager.createDots()
dotsManager.draw100()

// Add donations
setTimeout(() => {
  dotsManager.addDonation("Test Company A")
}, 1000)

setTimeout(() => {
  dotsManager.addDonation("Test Company B")
}, 2000)

setTimeout(() => {
  dotsManager.addDonation("Test Company C")
}, 3000)

setTimeout(() => {
  dotsManager.addDonation("Test Company D")
}, 5000)

setTimeout(() => {
  dotsManager.addDonation("Test Company E")
}, 8000)

setTimeout(() => {
  dotsManager.addDonation("Test Company F")
}, 8000)

setTimeout(() => {
  dotsManager.addDonation("Test Company G")
}, 9000)

setTimeout(() => {
  dotsManager.addDonation("Test Company H")
}, 9500)

setTimeout(() => {
  dotsManager.addDonation("Test Company I")
}, 10000)

setTimeout(() => {
  dotsManager.addDonation("Test Company J")
}, 11000)

setTimeout(() => {
  dotsManager.addDonation("Test Company K")
}, 12000)

setTimeout(() => {
  dotsManager.addDonation("Test Company L")
}, 13000)

setTimeout(() => {
  dotsManager.addDonation("Test Company M")
}, 13500)

setTimeout(() => {
  dotsManager.addDonation("Test Company N")
}, 15000)

setTimeout(() => {
  dotsManager.addDonation("Test Company O")
}, 15500)

setTimeout(() => {
  dotsManager.addDonation("Test Company P")
}, 18000)

setTimeout(() => {
  dotsManager.addDonation("Test Company Q")
}, 20000)

setTimeout(() => {
  dotsManager.addDonation("Test Company H")
}, 23000)

setTimeout(() => {
  dotsManager.addDonation("Test Company I")
}, 25000)

setTimeout(() => {
  dotsManager.addDonation("Test Company J")
}, 28000)
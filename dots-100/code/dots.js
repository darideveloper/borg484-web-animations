const dotsWrapper = document.querySelector('.dots')
const maxDots = 850
const requiredDots = 317

class Dots {

  /**
   * Create dots grid
   */
  createDots() {
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dotsWrapper.appendChild(dot)
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
  showValidDots() {

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
    const dotsDiff = requiredDots - createdDots.length
    const dotsDiffAbs = Math.abs(dotsDiff)
    console.log({ createdDots, dotsDiff })

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
    console.log({ createdDots, requiredDots, finalDots })
  }
}




// Create dots grid
const dotsManager = new Dots()
dotsManager.createDots()

// Draw initial valid dots
dotsManager.showValidDots()
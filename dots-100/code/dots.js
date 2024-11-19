const dotsWrapper = document.querySelector('.dots')
const maxDots = 850

class Dots {

  /**
   * Create dots grid
   */
  createDots() {
    console.log('Creating dots')
    for (let i = 0; i < maxDots; i++) {
      console.log('Creating dot')
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
    const mainRect = mainElement.getBoundingClientRect();
  
    // Helper function to check overlap
    const isOverlapping = (rect1, rect2) => {
        return !(
            rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom
        );
    };
  
    // Check if it's overlapping any valid div
    for (let validDiv of validDivs) {
        const validRect = validDiv.getBoundingClientRect();
        if (isOverlapping(mainRect, validRect)) {
            return true; // It's over a valid div and no invalid divs
        }
    }
  
    // Default: not over any valid div
    return false;
  }

  /**
   * show initial dots
   */
  showValidDots () {
    const dots = document.querySelectorAll('.dot')
    const validDivs = document.querySelectorAll('.over')
    const invalidDivs = document.querySelectorAll('.not-over')
    for (const dot of dots) {
      const dotOver = this.isOverValidDiv(dot, validDivs, invalidDivs)
      if (dotOver) {
        dot.classList.add('over')
      }
    }
  }
}




// Create dots grid
const dotsManager = new Dots()
dotsManager.createDots()

// Draw initial valid dots
dotsManager.showValidDots()

const dotsNumber = document.querySelectorAll('.dot.over').length
console.log('Dots over valid divs:', dotsNumber)


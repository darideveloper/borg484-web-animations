class BricksManager {
  constructor() {
  }

  /**
   * Calculate row with less width and return it
   * 
   * @returns {Node} - row with less width
   */
  getNextRow() {
    this.rows = document.querySelectorAll('.row')
    let smallerRow = null
    let smallerWidth = 0
    for (let row of this.rows) {
      let width = row.offsetWidth
      if (smallerRow === null || width < smallerWidth) {
        smallerRow = row
        smallerWidth = width
      }
    }

    return smallerRow
  }

  /**
   * Create new brick donation
   * 
   * @param {string} name - donation name
   */
  async addDonation(name) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add new brick to the row with less width
    const newRow = this.getNextRow()
    
    const newBrickElem = document.createElement('div')
    newBrickElem.classList.add('brick')
    newBrickElem.classList.add('name-wrapper')
    newBrickElem.classList.add('opacity-0')

    const nameElem = document.createElement('span')
    nameElem.innerHTML = name
    newBrickElem.appendChild(nameElem)

    const bgElem = document.createElement('span')
    bgElem.classList.add('bg')
    newBrickElem.appendChild(bgElem)

    newRow.appendChild(newBrickElem)

    // Scroll to right
    window.scrollTo(document.body.scrollWidth, 0)

    // Set random opacity to ::before element
    const opacityMin = 0.4
    const opacityMax = 0.9
    const opacity = Math.random() * (opacityMax - opacityMin) + opacityMin
    bgElem.style.opacity = opacity

    // Remove transparence from bricks
    setTimeout(() => {
      newBrickElem.classList.remove('opacity-0')
    }, 100)


  }
}

async function main() {
  // Start bricks manager
  const bricksManager = new BricksManager()
  
  // ---------------------------
  // EDIT THIS PART TO ADD DONATIONS
  // ---------------------------
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
  await bricksManager.addDonation("John Doe 1")
  await bricksManager.addDonation("Sample Long Name")
  await bricksManager.addDonation("Another Sample Long Name")
}

// Run main function
main()
class BricksManager {
  constructor() {
    // Get global elements
    this.rows = document.querySelectorAll('.row')
  }

  /**
   * Calculate row with less width and return it
   * 
   * @returns {Node} - row with less width
   */
  getNextRow() {
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
  addDonation(name) {
    const newRow = this.getNextRow()

    const newBrick = `
      <div class="brick name-wrapper">
          <span>${name}</span>
      </div>
    `
    newRow.innerHTML += newBrick
  }
}

const names = ["John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name", "John Doe", "Jane Doe", "John Smith", "Jane Smith", "Sample Long Name", "Another Sample Long Name"]
const bricksManager = new BricksManager()

setInterval(() => {
  const lastName = names.pop()
  bricksManager.addDonation(lastName)
}, 1000)
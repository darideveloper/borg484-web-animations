

class DiscoBalls {
  /**
   * Create a disco balls and animate it
   * @param {number} initialAmount - The initial amount of donations
   * @param {number} maxAmount - The max amount of donations
   * @param {HTMLElement} ball - The disco ball element
  */
  constructor(initialAmount, maxAmount, ballWrapper) {

    // Get elemebts
    this.ballElem = ballWrapper.querySelector(".discoball")
    this.amountElem = ballWrapper.querySelector(".amount")

    // Animations data
    this.initialDiscoBallSize = 0.35
    this.maxDiscoBallSize = 1
    this.currentBallSize = this.initialDiscoBallSize

    this.initialAmount = initialAmount
    this.maxAmount = maxAmount
    this.currentAmount = initialAmount
    this.lastAmount = 0

    // Render ball and initial amount
    this.createDiscoBall(this.ballElem)
    this.updateAmount()

    // Calculate mirror to activate in each donation
    const mirrors = this.ballElem.querySelectorAll(".mirror")
    const mirrorsAmount = mirrors.length
    this.mirrorsPerDonation = mirrorsAmount / maxAmount

    // Calculate size increase per donation
    this.sizeIncreasePerDonation = (this.maxDiscoBallSize - this.initialDiscoBallSize) / maxAmount

    // Initial render of the disco ball
    this.updateDiscoBall()
  }

  /**
 * Render a disco balls
 * @param {HTMLElement} ball - The disco ball
 * 
 */
  createDiscoBall(ball) {

    const screenWidth = window.innerWidth
    const radius = screenWidth / 5

    ball.style.width = `${2 * radius}px`
    ball.style.height = `${2 * radius}px`
    ball.style.marginLeft = `-${radius}px`

    const mirrorSize = radius / 7
    const rows = 16
    const angleIncLatitude = Math.PI / rows

    for (let a = 0; a < Math.PI; a += angleIncLatitude) {
      const z = radius * Math.cos(a)
      const r = radius * Math.sin(a)
      const circumference = 2 * Math.PI * r

      const mirrorsInRow = Math.floor(circumference / (1.2 * mirrorSize))
      const angleIncRow = (2 * Math.PI) / mirrorsInRow

      for (let b = 0; b < 2 * Math.PI; b += angleIncRow) {
        const x = r * Math.cos(b)
        const y = r * Math.sin(b)

        addMirror(x, y, z, a, b)
      }
    }

    function addMirror(x, y, z, a, b) {
      const mirror = document.createElement("DIV")
      mirror.classList.add("mirror")
      mirror.classList.add("hiddden")

      mirror.setAttribute("data-angle", a) // stored only to change the colour later depending on angle

      mirror.style.width = `${mirrorSize}px`
      mirror.style.height = `${mirrorSize}px`
      mirror.style.transform = `translateX(${radius + x - mirrorSize / 2
        }px) translateY(${radius + y - mirrorSize / 2
        }px) translateZ(${z}px) rotateZ(${b}rad) rotateY(${a}rad)`

      mirror.style.backgroundColor = randomGreyColour(a)

      ball.appendChild(mirror)
    }

    function randomGreyColour(a) {
      const normal = Math.floor(Math.random() * 20) + 30
      const bright = Math.floor(Math.random() * 50) + 30
      const l = a > 1 && a < 2 ? bright : normal
      return `hsl(0, 0%, ${l}%)`
    }

  }

  addDonation(amount) {
    // Update amount
    this.lastAmount = this.currentAmount
    this.currentAmount += amount
    if (this.currentAmount > this.maxAmount) {
      this.currentAmount = this.maxAmount
    }


    // Render disco ball and amount
    this.updateDiscoBall()
    this.updateAmount()
  }

  updateDiscoBall() {

    function addSparkle() {
      const delay = Math.floor(Math.random() * 3)
      const animation = `sparkle 3s ${delay}s infinite`
      return animation
    }

    // Activate mirrors
    const hiddenMirrors = this.ballElem.querySelectorAll(".mirror.hiddden")

    const diffAmount = this.currentAmount - this.lastAmount
    const mirrorsToActivateNum = Math.ceil(diffAmount * this.mirrorsPerDonation)
    const mirrors = Array.from(hiddenMirrors)
    const randomMirrors = mirrors.sort(() => Math.random() - 0.5)
    const mirrorsToActivate = randomMirrors.slice(0, mirrorsToActivateNum)
    for (const mirror of mirrorsToActivate) {

      // Show mirror
      mirror.classList.remove("hiddden")

      // Add sparkle animation
      setTimeout(() => {
        mirror.style.animation = addSparkle()
      }, 3000)
    }

    // Scale disco ball
    this.currentBallSize = this.sizeIncreasePerDonation * this.currentAmount
    this.ballElem.style.scale = this.currentBallSize
  }

  updateAmount() {
    // Animate amount
    this.animateValue(
      this.amountElem,
      this.currentAmount - this.lastAmount,
      this.currentAmount,
      2000
    )
  }

  animateValue(elem, start, end, duration) {
    // assumes integer values for start and end

    var obj = elem
    var range = end - start
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range))

    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer)

    // get current time and calculate desired end time
    var startTime = new Date().getTime()
    var endTime = startTime + duration
    var timer

    function run() {
      var now = new Date().getTime()
      var remaining = Math.max((endTime - now) / duration, 0)
      var value = Math.round(end - (remaining * range))
      obj.innerHTML = value
      if (value == end) {
        clearInterval(timer)
      }
    }

    timer = setInterval(run, stepTime)
    run()
  }

}

// Refresh page when resize
window.addEventListener("resize", () => {
  location.reload()
})

// Start the disco balls animations
const discoBallWrapper = document.querySelector(".ball-container")


// >>>>>> Setup amounts >>>>>>>>
const initialAmount = 1000
const maxAmount = 2000
// >>>>>> End Setup amounts >>>>>>>>


const discoBall = new DiscoBalls(initialAmount, maxAmount, discoBallWrapper)

// >>>>>> Donations >>>>>>>>
setTimeout(() => {
  discoBall.addDonation(100)
}, 3000)

setTimeout(() => {
  discoBall.addDonation(500)
}, 6000)

setTimeout(() => {
  discoBall.addDonation(1000)
}, 10000)
// >>>>>> End donations >>>>>>>>

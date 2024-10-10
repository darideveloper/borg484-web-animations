

class DiscoBalls {
  /**
   * Create a disco balls and animate it
   * @param {number} initialAmount - The initial amount of donations
   * @param {number} maxAmount - The max amount of donations
   * @param {HTMLElement} ball - The disco ball element
  */
  constructor(initialAmount, maxAmount, ball) {

    // Render ball
    this.createDiscoBall(ball)
    this.ball = ball

    // Animations data
    this.initialDiscoBallSize = 0.35
    this.maxDiscoBallSize = 1
    this.currentBallSize = this.initialDiscoBallSize
    
    this.initialAmount = initialAmount
    this.maxAmount = maxAmount
    this.currentAmount = initialAmount
    this.lastAmount = 0

    // Calculate mirror to activate in each donation
    const mirrors = this.ball.querySelectorAll(".mirror")
    const mirrorsAmount = mirrors.length
    console.log({mirrorsAmount, maxAmount})
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
      mirror.style.animation = addSparkle()

      ball.appendChild(mirror)
    }

    function randomGreyColour(a) {
      const normal = Math.floor(Math.random() * 20) + 30
      const bright = Math.floor(Math.random() * 50) + 30
      const l = a > 1 && a < 2 ? bright : normal
      return `hsl(0, 0%, ${l}%)`
    }

    function addSparkle() {
      const delay = Math.floor(Math.random() * 3)
      const animation = `sparkle 3s ${delay}s infinite`
      return animation
    }
  }

  addDonation(amount) {
    // Update amount
    this.lastAmount = amount
    this.currentAmount += amount
    if (this.currentAmount > this.maxAmount) {
      this.currentAmount = this.maxAmount
    }

    // Render disco ball
    this.updateDiscoBall()
  }

  updateDiscoBall() {

    // Activate mirrors
    const hiddenMirrors = this.ball.querySelectorAll(".mirror.hiddden")

    const diffAmount = this.currentAmount - this.lastAmount
    const mirrorsToActivateNum = Math.floor(diffAmount * this.mirrorsPerDonation)
    const mirrors = Array.from(hiddenMirrors)
    const randomMirrors = mirrors.sort(() => Math.random() - 0.5)
    const mirrorsToActivate = randomMirrors.slice(0, mirrorsToActivateNum)
    for (const mirror of mirrorsToActivate) {
      mirror.classList.remove("hiddden")
    }

    // Scale disco ball
    this.currentBallSize = this.sizeIncreasePerDonation * this.currentAmount
    console.log(this.currentBallSize)
    this.ball.style.scale = this.currentBallSize
  }
}

// Refresh page when resize
window.addEventListener("resize", () => {
  location.reload();
});

// Start the disco balls animations
const discoBallLeftElem = document.querySelector(".ball-container.left .discoball")
const discoBallMiddleElem = document.querySelector(".ball-container.middle .discoball")
const discoBallRightElem = document.querySelector(".ball-container.right .discoball")

const discoBallLeft = new DiscoBalls(500, 1000, discoBallLeftElem)
const discoBallMiddle = new DiscoBalls(1000, 2000, discoBallMiddleElem)
const discoBallRight = new DiscoBalls(2000, 3000, discoBallRightElem)

setTimeout(() => {
  discoBallLeft.addDonation(500)
}, 1000)

setTimeout(() => {
  discoBallMiddle.addDonation(1000)
}, 2000)

setTimeout(() => {
  discoBallRight.addDonation(1000)
}, 3000)


// etInterval(() => {

//   const mirrorsElems = document.querySelectorAll(".mirror.hiddden")
//   const randomMirror = mirrorsElems[Math.floor(Math.random() * mirrorsElems.length)]
//   if (randomMirror) {
//     randomMirror.classList.remove("hiddden")
//   }
// }, 100)s
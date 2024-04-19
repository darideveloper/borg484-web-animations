
class Render {
  
  /**
   * Render flowers based in donations
   * @param {int} goalAmount final amount to reach
   * @param {int} initialAmount initial amount donated
   */
  constructor(goalAmount) {

    // Save initial values
    this.goalAmount = goalAmount
    this.currentAmount = 0

    // Get global elements
    this.flowersWrapper = document.querySelector('.flowers-wrapper')
    

    // Calculate flowers per dollar
    const maxFlowers = 600
    this.flowersPerDollar = maxFlowers / goalAmount
  }

  renderFlower() {

    // Create flower
    const flowrsImages = [
      "./imgs/flower-1.png",
      "./imgs/flower-2.png"
    ]
    const flowrsRotations = ["x", "y"]
    const flowerImage = flowrsImages[Math.floor(Math.random() * flowrsImages.length)]
    const flowerRotation = flowrsRotations[Math.floor(Math.random() * flowrsRotations.length)]
    const flower = document.createElement('img')
    flower.src = flowerImage
    flower.classList.add('flower')
    flower.classList.add(flowerRotation)
    flower.classList.add('transparent')

    // Place flower in a random position
    flower.style.top = Math.random() * 100 + '%'
    flower.style.left = Math.random() * 100 + '%'

    // Add flower to the flowersWrapper
    this.flowersWrapper.appendChild(flower)

    setTimeout(() => {
      flower.classList.remove('transparent')
    }, 100)
  }

  /**
   * Add new donations, increase the current amount and render new flowers
   * @param {int} amount new donation value
   */
  addDonation(amount) {

    const donationData = { amount: this.currentAmount }
    this.currentAmount += amount

    // Render initial flowers
    const flowersNum = Math.floor(this.currentAmount * this.flowersPerDollar)
    for (let flowerNum = 0; flowerNum < flowersNum; flowerNum++) {
      this.renderFlower()
    }

    // Animate amount
    const amountElem = document.querySelector('.amount')
    anime({
      targets: donationData,
      amount: this.currentAmount,
      round: 1,
      easing: 'linear',
      duration: 1000,
      update: function() {
        amountElem.innerHTML = `$${donationData.amount}`
      }
    })

  }
}
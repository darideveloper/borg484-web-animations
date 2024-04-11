const catIdleElem = document.querySelector(".cat .video-wrapper.idle")
const catDonationElem = document.querySelector(".cat .video-wrapper.donation")
const catBallElem = document.querySelector(".cat .video-wrapper.ball")
const dogIdleElem = document.querySelector(".dog .video-wrapper.idle")
const dogDonationElem = document.querySelector(".dog .video-wrapper.donation")
const dogBallElem = document.querySelector(".dog .video-wrapper.ball")
const ballsElem = document.querySelector(".balls")

let animationRunning = false
let isEnded = false

async function animatePet(idleElem, animateElem, sleepTime) {
  animateElem.classList.remove("hide")
  idleElem.classList.add("hide")
  animationRunning = true
  video = animateElem.querySelector("video")
  video.currentTime = 0
  video.play()
  setTimeout(() => {
    animateElem.classList.add("hide")
    idleElem.classList.remove("hide")
    animationRunning = false
  }, sleepTime)
}

async function animateBall(winner) {

  // Change css clases based in winner, to run animations
  let startClass
  let endClass
  if (winner == "cat") {
    startClass = "dog-start"
    endClass = "cat-end"
  } else {
    startClass = "cat-start"
    endClass = "dog-end"
  }

  // Move ball to initial position
  ballsElem.classList.add(startClass)

  // Make ball visible after place
  setTimeout(() => {
    ballsElem.style.transitionDuration = "1s"
    ballsElem.classList.remove("hide")
  }, 1000)

  setTimeout(() => {
    ballsElem.style.transitionDuration = "4s"
    ballsElem.classList.add(endClass)
    ballsElem.classList.remove(startClass)
  }, 4000)
}

async function render() {

  if (animationRunning) {
    return null
  }

  // Detect new donations
  const donations = await getDonations()

  if (donations.ended && !isEnded) {
    // Animate end animation
    if (donations.winner === "dog") {
      setTimeout(() => {
        animatePet(catIdleElem, catBallElem, 5500)
      }, 2900)
      animateBall("dog")
    } else {
      animatePet(dogIdleElem, dogBallElem, 5500)
      animateBall("cat")
    }
    isEnded = true
  } else {
    // Animate donations
    if (donations.newCat) {
      console.log("New cat donation!")
      animatePet(catIdleElem, catDonationElem, 5250)
    }

    if (donations.newDog) {
      console.log("New dog donation!")
      animatePet(dogIdleElem, dogDonationElem, 5250)
    }
  }
}

setInterval(render, 5000)

// let timeline = anime.timeline({
//   easing: 'easeOutExpo',
//   duration: 750
// });

// timeline.add({
//   targets: '.balls',
//   translateX: 250,
//   translateY: -250,
// })
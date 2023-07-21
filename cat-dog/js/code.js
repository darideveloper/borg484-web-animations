const catIdleElem = document.querySelector (".cat .video-wrapper.idle")
const catDonationElem = document.querySelector (".cat .video-wrapper.donation")
const dogIdleElem = document.querySelector (".dog .video-wrapper.idle")
const dogDonationElem = document.querySelector (".dog .video-wrapper.donation")

let animationRunning = false

async function animate (idleElem, animateElem) {
  animateElem.classList.remove ("hide")
  idleElem.classList.add ("hide")
  animationRunning = true
  video = animateElem.querySelector ("video")
  video.currentTime = 0
  video.play ()
  setTimeout (() => {
    animateElem.classList.add ("hide")
    idleElem.classList.remove ("hide")
    animationRunning = false
  }, 5250)
}

async function render () {

  if (animationRunning) {
    return null
  }

  // Detect new donations
  const donations = await getDonations()
  
  // Animate donations
  if (donations.newCat) {
    console.log ("New cat donation!")
    animate (catIdleElem, catDonationElem)
  } 

  if (donations.newDog) {
    console.log ("New dog donation!")
    animate (dogIdleElem, dogDonationElem)
  }
}

setInterval(render, 5000);
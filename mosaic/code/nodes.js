// Create and return donation node
function getDonationNode (donationData) {
  // Create donation element
  const donationElem = document.createElement ('div')
  donationElem.classList.add ('donation')
  donationElem.classList.add ('hide')

  // Create donation image element
  const donationImageElem = document.createElement ('img')
  donationImageElem.classList.add ('donation-image')
  donationImageElem.setAttribute ('src', donationData.image)
  donationImageElem.setAttribute ('alt', donationData.name)
  donationImageElem.setAttribute ('title', donationData.name)

  // Append donation image to donation element
  donationElem.appendChild (donationImageElem)

  return donationElem
}


function getLineNode () {
  const donationsLineElem = document.createElement ('div')
  donationsLineElem.classList.add ('donations-line')

  return donationsLineElem
}

// Make donations already rendered, visible
async function showDonations () {
  // Make donations visible, one by one
  const donationsElems = document.querySelectorAll ('.donation.hide')
  for (const donation of donationsElems) {
    await new Promise (resolve => setTimeout (resolve, 300))
    donation.classList.remove ('hide')
  }
}

// Get and animate a random donation
async function animateRandomDonation () {

  // Get a random donation
  const donationsElems = document.querySelectorAll ('.donation')
  if (donationsElems.length === 0) {
    return null
  }
  const randomDonationElem = donationsElems[Math.floor (Math.random () * donationsElems.length)]

  // Animate
  randomDonationElem.classList.add ('animate')
  await new Promise (resolve => setTimeout (resolve, 3000))
  randomDonationElem.classList.remove ('animate')
}

// Animate random donation every 3 seconds
setInterval (animateRandomDonation, 3000)
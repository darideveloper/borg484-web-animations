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
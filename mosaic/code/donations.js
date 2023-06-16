const donationsPerLine = 12

const donationsWrapperElem = document.querySelector ('.donations-wrapper')

// Render donations images
function renderDonations () {

  // Get donatrions
  const donations = getDonations ()

  // Split donation in lines
  const donationsPerLine = 13
  let donationsLines = []
  let donationsLine = []
  donations.forEach ((donation) => {
    donationsLine.push (donation)
    if (donationsLine.length === donationsPerLine) {
      donationsLines.push (donationsLine)
      donationsLine = []
    }
  })
  if (donationsLine.length > 0) {
    donationsLines.push (donationsLine)
  }

  // Render each line
  donationsLines.forEach ((donationsLine) => {
    
    // Create line element
    const donationsLineElem = document.createElement ('div')
    donationsLineElem.classList.add ('donations-line')
    
      // Render each donation
      donationsLine.forEach ((donation) => {
          
          // Create donation element
          const donationElem = document.createElement ('div')
          donationElem.classList.add ('donation')
      
          // Create donation image element
          const donationImageElem = document.createElement ('img')
          donationImageElem.classList.add ('donation-image')
          donationImageElem.setAttribute ('src', donation.image)
          donationImageElem.setAttribute ('alt', donation.name)
          donationImageElem.setAttribute ('title', donation.name)
      
          // Append donation image to donation element
          donationElem.appendChild (donationImageElem)
      
          // Append donation element to donations wrapper
          donationsLineElem.appendChild (donationElem)
      })

    // Append line element to donations wrapper
    donationsWrapperElem.appendChild (donationsLineElem)

  })
}

renderDonations ()

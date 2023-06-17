const donationsWrapperElem = document.querySelector ('.donations-wrapper')
let donations = []

// Make donations already rendered, visible
async function showDonations () {
    // Make donations visible, one by one
    const donationsElems = document.querySelectorAll ('.donation.hide')
    for (const donation of donationsElems) {
      await new Promise (resolve => setTimeout (resolve, 300))
      donation.classList.remove ('hide')
    }
}

// Render donations images from api
async function renderDonations () {

  // Get donatrions
  donations = await getDonations ()

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
  donationsLines.forEach (async (donationsLine) => {
    
    // Create line element
    const donationsLineElem = getLineNode ()
    
      // Render each donation
      for (const donation of donationsLine) {

        // Create donation element
        const donationElem = getDonationNode (donation)
        
        // Append donation element to donations wrapper
        donationsLineElem.appendChild (donationElem)
      }

    // Append line element to donations wrapper
    donationsWrapperElem.appendChild (donationsLineElem)

  })

  showDonations ()
}

async function renderNewDonation () {
  // Get donations from api
  const newDonations = await getDonations ()

  // Filter new donations
  const newDonationsFiltered = newDonations.filter (newDonation => {
    return !donations.some (donation => donation.name === newDonation.name)
  })

  // render new donations
  newDonationsFiltered.forEach (async (newDonation) => {

    // Get last line
    let lastLineElem = donationsWrapperElem.querySelector ('.donations-line:last-child')

    // Vlaidate number of elements in last line
    isNewLine = false
    if (lastLineElem.children.length >= 13) {
      // Create new line
      lastLineElem = donationsLineElem ()
      isNewLine = true
    }

    // Create and place donation element
    const donationElem = getDonationNode (newDonation)
    lastLineElem.appendChild (donationElem)

    // Add new line to wrapper
    if (isNewLine) {
      donationsWrapperElem.appendChild (lastLineElem)
    }
  })

  showDonations ()

  donations = newDonations

  console.log ('New donations rendered')
}

// Render initial donations
renderDonations ()

// Render new donations every 10 seconds
setInterval (renderNewDonation, 10000)
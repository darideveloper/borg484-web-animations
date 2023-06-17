const donationsWrapperElem = document.querySelector ('.donations-wrapper')
const donationsPerCol = 6
let donations = []

// Render donations images from api
async function renderDonations () {

  // Get donatrions
  donations = await getDonations ()

  // Split donation in Cols
  let donationsCols = []
  let donationsCol = []
  donations.forEach ((donation) => {
    donationsCol.push (donation)
    if (donationsCol.length === donationsPerCol) {
      donationsCols.push (donationsCol)
      donationsCol = []
    }
  })
  if (donationsCol.length > 0) {
    donationsCols.push (donationsCol)
  }

  // Render each Col
  donationsCols.forEach (async (donationsCol) => {
    
    // Create Col element
    const donationsColElem = getColNode ()
    
      // Render each donation
      for (const donation of donationsCol) {

        // Create donation element
        const donationElem = getDonationNode (donation)
        
        // Append donation element to donations wrapper
        donationsColElem.appendChild (donationElem)
      }

    // Append Col element to donations wrapper
    donationsWrapperElem.appendChild (donationsColElem)

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

    // Get last Col
    let lastColElem = donationsWrapperElem.querySelector ('.donations-col:last-child')

    // Vlaidate number of elements in last Col
    isNewCol = false
    if (lastColElem.children.length >= donationsPerCol) {
      // Create new Col
      lastColElem = donationsColElem ()
      isNewCol = true
    }

    // Create and place donation element
    const donationElem = getDonationNode (newDonation)
    lastColElem.appendChild (donationElem)

    // Add new Col to wrapper
    if (isNewCol) {
      donationsWrapperElem.appendChild (lastColElem)
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
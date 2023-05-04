import { donationIn, donationOut } from './animations.js'

let donation = {
  "donation_name": "initial",
  "donation_amount": 0
}
let fist_donation = true

async function update_donation () {
  // Get data from remote json file
  const res = await fetch("https://raw.githubusercontent.com/darideveloper/borg484-web-animations/master/construction-screen/donation.json")
  const json_data = await res.json()
  
  // Catch new donation
  const new_donation = json_data
  console.log ({new_donation, donation})
  if (new_donation.donation_name != donation.donation_name || new_donation.donation_amount != donation.donation_amount) {
    donation = new_donation
    console.log("Donation data updated")

    // Animate
    let wait_time = 3000
    if (!fist_donation) {
      donationOut()
      wait_time = 0
    }
    setTimeout (donationIn, wait_time)

    // Update donation state
    if (fist_donation) {
      fist_donation = false
    }

  }
}

// Update donation data every 5 seconds
update_donation ()
setInterval(update_donation, 10000)
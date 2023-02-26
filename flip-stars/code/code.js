import {create_empty_stars, write_donor, sleep} from "./stars.js"

let last_donors = []
let donors = []
let max_stars = 0

async function update_data () {
  // Get data from remote json file
  const res = await fetch("https://raw.githubusercontent.com/darideveloper/borg484-web-animations/master/flip-stars/donors.json")
  const json_data = await res.json()
  
  // Get data from json
  donors = json_data.donors
  max_stars = json_data.max_stars
}

async function render_empty_stars () {
  // render empty stars
  await update_data ()
  await create_empty_stars (max_stars)
}

async function render_new_stars () {

  await update_data ()
    
  // Filter new donors
  const new_donors = donors.filter (donor => !last_donors.includes(donor))
  if (new_donors.length > 0) {
    console.log (`New donors: ${new_donors.join(", ")}`)
  } else {
    console.log ("No new donors")
  }
  for (const donor of new_donors) {

    // Write donor in star
    await write_donor (donor)
    last_donors.push(donor)
  }
  
  // Render again new stars, after 1 second
  await sleep (5000)
  render_new_stars ()
}

async function init () {
  // Initial function for firsts runs
  await render_empty_stars () 
  await render_new_stars ()
}

// Run init function
init ()
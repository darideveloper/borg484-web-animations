import {create_empty_stars, write_donnor, sleep} from "./stars.js"

let last_donnors = []
let donnors = []
let max_stars = 0

async function update_data () {
  // Get data from remote json file
  const res = await fetch("https://raw.githubusercontent.com/darideveloper/borg484-web-animations/master/flip-stars/donnors.json")
  const json_data = await res.json()
  
  // Get data from json
  donnors = json_data.donnors
  max_stars = json_data.max_stars
}

async function render_empty_stars () {
  // render empty stars
  await update_data ()
  await create_empty_stars (max_stars)
}

async function render_new_stars () {

  await update_data ()
    
  // Filter new donnors
  const new_donnors = donnors.filter (donnor => !last_donnors.includes(donnor))
  for (const donnor of new_donnors) {

    // Write donnor in star
    await write_donnor (donnor)
    last_donnors.push(donnor)
  }
  
  // Render again new stars, after 1 second
  await sleep (1000)
  render_new_stars ()
}

async function init () {
  // Initial function for firsts runs
  await render_empty_stars () 
  await render_new_stars ()
}

// Run init function
init ()
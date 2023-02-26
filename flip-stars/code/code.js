import {create_stars} from "./stars.js"

async function render_stars () {
    
  // Get data from remote json file
  const res = await fetch("https://raw.githubusercontent.com/darideveloper/borg484-web-animations/master/flip-stars/donnors.json")
  const json_data = await res.json()
  console.log (json_data)
  
  // Get data from json
  const donnors = json_data.donnors
  const max_stars = json_data.max_stars

  create_stars (max_stars, donnors)
}

// Render stars each 5 seconds
render_stars ()
setInterval (render_stars, 10000)
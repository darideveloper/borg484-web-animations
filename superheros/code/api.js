let donors = []
const hero_elems = document.querySelectorAll (".hero")

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function update_data () {
  // Get data from remote json file
  const res = await fetch("https://raw.githubusercontent.com/darideveloper/borg484-web-animations/master/superheros/code/api.json")

  const json_data = await res.json()
  
  // Get data from json
  donors = json_data
}

async function render_donations () {

  await update_data ()

  // Place data
  donors.forEach ((donation, index) => {
    // Get elements
    const hero_elem = hero_elems [index]
    const amount_elem = hero_elem.querySelector (".amount > .num")
    const name1_elem = hero_elem.querySelector (".name1")
    const name2_elem = hero_elem.querySelector (".name2")

    // Place data
    name1_elem.innerHTML = donation.name1
    name2_elem.innerHTML = donation.name2

    // calculate and animate amount
    current_amount = parseInt (amount_elem.value.replace ("$", ""))

    if (!current_amount) {
      current_amount = 0
    }
    anime({
      targets: amount_elem,
      value: [`$${current_amount}`, `$${donation.amount}`],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 3000,
    })
  })

  // recursivity time out
  setTimeout (render_donations, 5000)
}

async function show_heros () {
  // Animate in
  hero_elems.forEach (hero_elem => {
    hero_elem.classList.add ("show")
  })
}

async function init () {

  // Render ddata from api
  await show_heros ()
  await render_donations ()

  // Load main canvas
  const current_canvas = document.querySelector('#canvas')
  App(current_canvas, 100, chroma.scale(["#00ffea", "#00ffea"]))

  // Load hero canvas
  document.querySelectorAll (".canvas-hero").forEach(canvas => {
    App(canvas, 100, chroma.scale(["#ffdd00", "#ffee80"]))
  })
}



init ()
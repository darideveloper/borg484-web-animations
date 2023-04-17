let donors = []
let heros_data = [
  {
    selector: ".hero.a",
    color: ["#fd5d83", "#fd5d83"],
  },
  {
    selector: ".hero.b",
    color: ["#fdd45e", "#fdd45e"],
  },
  {
    selector: ".hero.c",
    color: ["#9173f5", "#9173f5"],
  }, 
]

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

    const hero_data = heros_data [index]

    // Get elements
    const hero_elem = document.querySelector (hero_data.selector)
    const amount_elem = hero_elem.querySelector (".amount > .num")
    const name1_elem = hero_elem.querySelector (".name1")
    const name2_elem = hero_elem.querySelector (".name2")

    // Place data
    name1_elem.innerHTML = donation.name1
    name2_elem.innerHTML = donation.name2

    // calculate amounts
    current_amount = parseInt (amount_elem.value.replace ("$", ""))

    if (!current_amount) {
      current_amount = 0
    }

    // Detect change in amount
    if (current_amount != donation.amount) {

      // Animate bubbles
      const selector_canvas = hero_data.selector + " .canvas-donation"
      const canvas_elem = document.querySelector(selector_canvas)
      canvas_elem.classList.add ("show")
      setTimeout (() => {
        canvas_elem.classList.remove ("show")
      }, 4000)

      // Animate amount
      anime({
        targets: amount_elem,
        value: [`$${current_amount}`, `$${donation.amount}`],
        round: 1,
        easing: 'easeInOutExpo',
        duration: 3000,
      })
    }

  })

  // recursivity time out
  setTimeout (render_donations, 5000)
}

async function show_heros () {
  // Animate in
  heros_data.forEach (hero_data => {
    const hero_elem = document.querySelector (hero_data.selector)
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
  for (hero_data_index in heros_data) {
    const hero_data = heros_data[hero_data_index]

    // Initialize main canvas
    let canvas_selector = hero_data.selector + " .canvas-main"
    let canvas_elem = document.querySelector(canvas_selector)
    App(canvas_elem, 100, chroma.scale(hero_data.color))

    // Initialize donation canvas
    canvas_selector = hero_data.selector + " .canvas-donation"
    canvas_elem = document.querySelector(canvas_selector)
    App(canvas_elem, 150, chroma.scale(hero_data.color))
  }
}

init ()
let currentDonations = 0
let newDonations = 0

const World = Matter.World

let firstRender = true

function animeAmount (selector, from, to) {
  anime({
    targets: selector,
    value: [from, `$${to}`],
    round: 1,
    easing: 'easeInOutExpo',
    duration: 2000
  })
} 

async function renderDonations () {

  // Get data from api
  let {donationsNum, donationsTeams} = await getDonations()

  // Update donations counters
  newDonations = donationsNum - currentDonations
  currentDonations = donationsNum

  // Render new donations
  let shape = getShape()
  for (let shapeId = 0; shapeId < newDonations; shapeId++) {
    
    // Render new donations
    World.add(world, shape)

    // Create new shape
    shape = getShape()
  }
  
  if (! firstRender) {
    return
  }

  // Update donations counters
  const teamsWrapper = document.querySelector('.teams')
  for (let {team, amount} of donationsTeams) {

    // Create theam element
    const teamElem = `
    <div class="team" data-team="${team}">
      <input type="text" class="name" value="${team}" />
      <input class="amount" value="0"/>
    </div>
    `

    // Add team element
    teamsWrapper.innerHTML += teamElem
  }
  
  // Add initial animation to donations counters
  donationsTeams.forEach (({team, amount}) => {
    const selectorAmount = `.teams .team[data-team="${team}"] input.amount`
    animeAmount (selectorAmount, 0, amount)
  })

  // Update counters header
  const teamsWrapperWidth = teamsWrapper.offsetWidth
  const height = teamsWrapperWidth*0.3
  teamsWrapper.style.height = `${height}px`

  firstRender = false

}
renderDonations ()

// Render new donations every 10 seconds
setInterval(renderDonations, 10000)
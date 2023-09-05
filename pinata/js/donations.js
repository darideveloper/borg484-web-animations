let currentDonations = 0
let newDonations = 0

const World = Matter.World

async function renderDonations () {

  // Get data from api
  let {donationsNum, totalTeam1, totalTeam2, totalTeam3} = await getDonations()

  // Update donations counters
  newDonations = donationsNum - currentDonations
  currentDonations = donationsNum

  console.log ({newDonations, currentDonations})

  // Render new donations
  let shape = getShape()
  for (let shapeId = 0; shapeId < newDonations; shapeId++) {
    
    // Render new donations
    World.add(world, shape)

    // Create new shape
    shape = getShape()
  }

}
renderDonations ()

// Render new donations every 5 seconds
setInterval(renderDonations, 5000)
let oldCatTotal = null
let oldDogTotal = null

async function getDonations () {

  // get data from api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/cat-dog"
  const response = await fetch(endpoint)
  const data = await response.json()
  const donations = data.donations
  let ended = !data.enabled

  // count totals
  let totalCat = 0
  let totalDog = 0
  donations.map ((row) => {
    if (row.team === "cat") {
      totalCat += parseFloat(row.amount)
    } else {
      totalDog += parseFloat(row.amount)
    }
  })

  // Save initial values
  if (oldCatTotal == null) {
    oldCatTotal = totalCat
  }
  if (oldDogTotal == null) {
    oldDogTotal = totalDog
  }

  // Detect new donations
  const newCat = oldCatTotal != totalCat
  const newDog = oldDogTotal != totalDog
  oldCatTotal = totalCat
  oldDogTotal = totalDog

  // Debug
  // console.log ({newCat, newDog, totalCat, totalDog, ended})

  let winner = totalCat > totalDog ? "cat" : "dog"

  // return data
  return {
    newCat,
    newDog,
    ended: ended,
    winner: winner,
  }
}
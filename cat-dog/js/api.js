let oldCatTotal = null
let oldDogTotal = null

// setTimeout(() => {
//   oldDogTotal = 1000
// }, 1000);

async function getDonations () {

  // get data from api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/cat-dog"
  const response = await fetch(endpoint)
  const data = await response.json()

  // count totals
  let totalCat = 0
  let totalDog = 0
  data.map ((row) => {
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

  console.log ({newCat, newDog, totalCat, totalDog})

  // return data
  return {
    newCat,
    newDog,
  }
}
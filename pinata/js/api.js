async function getDonations () {

  // get data from api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/pinata"
  const response = await fetch(endpoint)
  const data = await response.json()
  const donations = data.donations

  // count totals
  let totalTeam1 = 0
  let totalTeam2 = 0
  let totalTeam3 = 0
  donations.map ((row) => {
    if (row.team === "team1") {
      totalTeam1 += parseFloat(row.amount)
    } else if (row.team === "team2") {
      totalTeam2 += parseFloat(row.amount)
    } else if (row.team === "team3") {
      totalTeam3 += parseFloat(row.amount)
    }
  })
  
  let donationsNum = donations.length

  console.log ({totalTeam1, totalTeam2, totalTeam3, donationsNum})

  // return data
  return {
    donationsNum,
    totalTeam1,
    totalTeam2,
    totalTeam3,
  }
}
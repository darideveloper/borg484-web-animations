async function getDonations () {

  // get data from api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/pinata"
  const response = await fetch(endpoint)
  const data = await response.json()
  const donations = data.donations

  // Get all diffent values of "team"
  let teams = donations.map ((row) => row.team)
  teams = [...new Set(teams)]

  let donationsTeams = []

  // Save donations by team
  donations.map ((row) => {

    let team = donationsTeams.find ((team) => team.team === row.team)
    if (team) {
      // Update existing team
      team.amount += row.amount
    } else {
      // Create new team
      donationsTeams.push ({
        team: row.team,
        amount: row.amount
      })
    }
  })
  
  let donationsNum = donations.length

  // return data
  return {
    donationsNum,
    donationsTeams,
  }
}
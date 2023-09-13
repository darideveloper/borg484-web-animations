async function getDonations () {

  // Query to api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/big-star"
  const response = await fetch(endpoint)

  const data = await response.json()
  const donations = data.donations

  // Get donations names
  const names = donations.map(donation => donation.name)

  return names

}
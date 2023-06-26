async function getDonations () {
  // get data from api
  const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/screenleaves"
  const response = await fetch(endpoint)
  const data = await response.json()

  // format data
  dataFormatted = []
  data.map ((row) => dataFormatted.push(`${row.donor_frirst_name} ${row.donor_last_name}`))

  // return data
  return dataFormatted
}
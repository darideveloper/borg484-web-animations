const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/mosaic"
const baseS3 = "https://django-daridev.s3.amazonaws.com/media"

async function getDonations() {

  // Fetch json data from API
  const res = await fetch(endpoint)
  const data = await res.json()
  
  // Format data
  let donations = []
  data.forEach(donation => {
    donations.push ({
      "name": donation.donor,
      "image": `${baseS3}/${donation.image}`,
    })
  })

  return donations.slice(0, 10)
}

const endpoint = "https://web-animations-dashboard-74c97ec6c712.herokuapp.com/donations/christmaslandingpage"
const baseS3 = "https://django-daridev.s3.amazonaws.com/media"
let original_data = []
let data = []

function get_donation_format (donation_api) {
  const { name, image, size } = donation_api

  let size_text = "small"
  if (size == "m") {
    size_text = "medium"
  } else if (size == "l") {
    size_text = "large"
  }

  return {
    donor: name,
    photo: `${baseS3}/${image}`,
    size: size_text
  }
}

async function get_donations_api() {

  // Get data from api
  const response = await fetch(endpoint)
  const api_data = await response.json()

  // Format data
  const original_data = api_data.map(donation => {
    return get_donation_format(donation)
  })

  return original_data
}

async function updated_donations_api () {
  // Get data from api
  const response = await fetch(endpoint)
  const api_data = await response.json()
  
  // Detect new donations
  let new_donations = api_data.filter(donation => original_data.findIndex(d => d.donor == donation.name) == -1)
  new_donations = new_donations.map(donation => get_donation_format(donation))

  // Add new donations to original data
  if (new_donations.length > 0) {
    original_data = [...original_data, ...new_donations]
  }

  console.log ({api_data, original_data, new_donations})

}


async function get_donation() {

  // Query api first time
  if (original_data.length == 0) {
    original_data = await get_donations_api()
  }

  // Restartd data
  if (data.length == 0) {
    data = [...original_data]
  }

  // Get random element
  const sphere_index = Math.floor((Math.random() * data.length))
  const sphere_data = data[sphere_index]

  // Remove element from list
  data.splice(sphere_index, 1)

  return sphere_data
}

// Update donations every 10 seconds
setInterval(updated_donations_api, 5000)
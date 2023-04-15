function render_donations () {
  // Place donations information from api

  const hero_elems = document.querySelectorAll (".hero")

  fetch ("./code/api.json")
  .then (response => response.json())
  .then (data => {
    
    data.forEach ((donation, index) => {
      
      // Get elements
      const hero_elem = hero_elems [index]
      const amount_elem = hero_elem.querySelector (".amount > .num")
      const name1_elem = hero_elem.querySelector (".name1")
      const name2_elem = hero_elem.querySelector (".name2")

      // Place data
      console.log (amount_elem)
      amount_elem.innerHTML = donation.amount
      name1_elem.innerHTML = donation.name1
      name2_elem.innerHTML = donation.name2
    })

  })
}

window.addEventListener ("load", () => {
  render_donations ()
})
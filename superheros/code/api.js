function render_donations () {
  fetch ("./code/api.json")
  .then (response => response.json())
  .then (data => {
    console.log (data)
  })
}

window.addEventListener ("load", () => {
  render_donations ()
})
import { donors } from './api.js'

const content_circle = document.querySelector('.content-circle')
const bottom_flowers = document.querySelector('.bottom-flowers')

const flower_content = `
  <div class="flower-container">
      <div class="petals">
        <div class="petal-leaf"></div>
        <div class="petal-leaf"></div>
        <div class="petal-leaf"></div>
        <div class="petal-leaf"></div>
        <div class="petal-leaf"></div>
        <div class="petal-leaf"></div> 
        <div class="petal-center"></div>
      </div>
    <div class="stem"></div>
  </div>  
`

// Render specific number of flowers in circle
const num_flowers = 18
const angule = 360 / num_flowers
for (let num_flower = 0; num_flower < num_flowers; num_flower++) {

  // Create flower
  const current_angle = angule * num_flower
  const current_flower = `
  <div class="flower" style="transform: translate(-50%, -50%) rotate(${current_angle}deg);">
    ${flower_content}
  </div>`
  
  // Append flower to body
  content_circle.innerHTML += current_flower
}

// Render flowers in bottom
for (const donor in donors) {
  const donor_name_lines = donor.split(' ')
  const donor_name_elems = donor_name_lines.map(line => `<span>${line}</span>`)
  const amount = donors[donor]
  const current_donation = `
    <div class="donation">
      ${flower_content}
      <p class="amount">$ ${amount}</p>
      <p class="name">${donor_name_elems.join(" ")}</p>
    </div>
  `
  
  // Append flower to body
  bottom_flowers.innerHTML += current_donation
}
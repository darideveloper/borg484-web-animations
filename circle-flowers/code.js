import { donors } from './api.js'

const content = document.querySelector('.content-circle')

// Render specific number of flowers in circle
const num_flowers = 18
const angule = 360 / num_flowers
for (let num_flower = 0; num_flower < num_flowers; num_flower++) {

  // Create flower
  const current_angle = angule * num_flower
  const current_flower = `
  <div class="flower" style="transform: translate(-50%, -50%) rotate(${current_angle}deg);">
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
  </div>`
  
  // Append flower to body
  content.innerHTML += current_flower
}

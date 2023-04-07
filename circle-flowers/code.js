import { donors } from './api.js'

const content = document.querySelector('.content')

// Render a flower per donor
const angle = 360 / donors.length
donors.forEach((donor, index) => {

  // Create flower
  const current_angle = angle * index
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
})
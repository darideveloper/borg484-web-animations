import anime from './anime.js'

const animation_time = 15
const screen_space = 70
const screen_parts = 6
let positions_used = []
let spheres_wrapper = document.querySelector('.spheres')


function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

async function create_sphere(size, text, photo) {
  // Create a new sphere, add to wrapper and animate it

  // Crteate a new sphere
  let sphere = document.createElement('div')
  sphere.classList.add('sphere')
  sphere.classList.add(size)
  let sphere_text = document.createElement('span')
  sphere_text.innerHTML = text
  let sphere_photo = document.createElement('img')
  sphere_photo.src = photo
  sphere.appendChild(sphere_text)
  sphere.appendChild(sphere_photo)

  // Add sphere to wrapper
  spheres_wrapper.appendChild(sphere)

  // Wait time after creation, based in size
  if (size == "small") {
    await sleep(animation_time / 5)
  } else if (size == "medium") {
    await sleep(animation_time / 4)
  } else if (size == "large") {
    await sleep(animation_time / 3.5)
  }

  // Animate sphere with animejs
  anime({
    targets: sphere,
    keyframes: [
      {translateY: "-20vh", translateX: "-5vw"},
      {translateY: "-40vh", translateX: "5vw"},
      {translateY: "-60vh", translateX: "-5vw"},
      {translateY: "-80vh", translateX: "5vw"},
      {translateY: "-100vh", translateX: "-5vw"},
      {translateY: "-120vh", translateX: "5vw"},
      {translateY: "-140vh", translateX: "-5vw"},
      {translateY: "-160vh", translateX: "5vw"},
    ],
    duration: animation_time*1000,
    easing: 'cubicBezier(.31,0,.62,.96)'	
  });

  // Calculate position of the sphere
  let position
  while (true) {

    // validate if positions are full
    if (positions_used.length == screen_parts) {
      // Restart positions used
      positions_used = []
    }

    // Get random position without repetitions
    position = Math.floor(Math.random() * screen_parts)
    if (!positions_used.includes(position)) {
      positions_used.push(position)
      break
    }
  }

  // Calculate margin left of the sphere
  const margin = 7 + (position * screen_space / screen_parts)
  sphere.style.marginLeft = `${margin}vw`
}

async function create_spheres() {
  // Add new spheres with data from api

  // Infinity loop
  while (true) {

    // Query from api
    let { size, donor, photo } = await get_donation()

    // Create sphere
    await create_sphere(size, donor, photo)
  }

}

async function remove_spheres() {
  // Delete the firsts spheres after the animation

  // Wait for first sphere
  await sleep(animation_time + 2)

  while (true) {
    let last_sphere = spheres_wrapper.querySelector(".sphere:first-child")
    spheres_wrapper.removeChild(last_sphere)
    await sleep(animation_time / 3)
  }

}

// Auto create and remove spheres
create_spheres()
remove_spheres()

// Refresh screen on resize
window.addEventListener('resize', () => {
  location.reload()
})
const path = `<path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>`
const svg = `<svg class="blur" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${path}</svg>`
const svg_blur = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${path}</svg>`

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function create_empty_stars (max_stars) {

  const stars_wrapper = document.querySelector(".stars-wrapper")

  // Loop for each star
  for (let star_index = 0; star_index < max_stars; star_index++) {
    // Insert empty stars
    const star = `<div class="star empty">${svg}${svg_blur}</div>`
    stars_wrapper.innerHTML += star
  }

  // Wait 1 second after insert
  await sleep (1000)

  // Add loaded class to stars wrapper
  stars_wrapper.classList.add("loaded")

  // Wait 1 second after insert
  await sleep (1000)
}

export async function write_donnor (donnor) {  
  // insert new donnor in already created star
  const current_star = document.querySelector(".star.empty")
  const span_name = `<span class="name">${donnor}</span>`
  current_star.classList.remove("empty")
  current_star.innerHTML = span_name + svg + svg_blur

  // Wait 1 second after insert
  await sleep (1000)
}  


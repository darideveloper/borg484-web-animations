export function create_stars (max_stars, donnors) {
  
  // Insert empry stars
  const stars_wrapper = document.querySelector(".stars-wrapper")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/></svg>`
  const star = `<div class="star empty">${svg}</div>`
  stars_wrapper.innerHTML = star.repeat(max_stars)
  
  // insert empty starts
  donnors.forEach (donnor => {
    const current_star = document.querySelector(".star.empty")
    const span_name = `<span class="name">${donnor}</span>`
    current_star.classList.remove("empty")
    current_star.innerHTML = svg + span_name
  })
}  


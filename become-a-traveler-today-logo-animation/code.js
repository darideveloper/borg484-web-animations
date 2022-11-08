const animation_event = "keyup"

var building_counter = 0
var image_counter = 0
const body = document.querySelector ("body")
const buildings_wrapper = document.querySelector (".buildings")
var hue_angule = 0

// Wait specific time in secods
function sleep(secods) {
    return new Promise(resolve => setTimeout(resolve, 1000*secods));
}

async function display_building () {
    // Incress counters
    building_counter++
    image_counter++

    // Validate if the circle if full
    if (building_counter >= 19) {
        const replace_building_num = building_counter - 18
        const replace_building_selector = `.building${replace_building_num}`
        const replace_building = document.querySelector (replace_building_selector)

        replace_building.style.opacity = "0"
        await sleep (0.1)
        buildings_wrapper.removeChild (replace_building)

    }

    // Generate image path
    if (image_counter == 11) {
        image_counter = 1
    }
    let image_path = `imgs/buildings/building${image_counter}.svg`    

    // Create building wrapper
    let building = document.createElement ("div")
    building.classList.add (`building`)
    building.classList.add (`building${building_counter}`)
    
    // Create building image
    let image = document.createElement ("img")
    image.setAttribute ("src", image_path)

    // Get random name from api
    const name = get_random_name ()

    // Creater span
    let span = document.createElement ("span")
    span.classList.add ("building-text")
    span.innerHTML = name

    // Set rotation angle and transition duration
    building.style.transform = `translate(-50%, 0%) rotate(${(building_counter-1)*20}deg)`
    building.style.transitionDuration = "0.5s"
    building.style.opacity = "0"
    building.style.filter = `hue-rotate(${hue_angule}deg)`
    
    // add image to document
    building.appendChild(image)
    building.appendChild(span)
    buildings_wrapper.appendChild (building)

    // Update opacity
    await sleep (0.1)
    building.style.opacity = "1"

    // Update huw angle random
    hue_angule = Math.floor(Math.random() * 360)
}

async function animate () {
    
    // Detect event
    body.addEventListener (animation_event, async function () {
        
    })
}

async function main () {

    // Run animations
    animate ()
    while (true) {
        display_building ()
        await sleep (1)
    }
}

main ()
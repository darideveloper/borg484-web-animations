animation_time = 10

// Get spheres wrapper
let spheres_wrapper = document.querySelector('.spheres')

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function create_sphere (size, text) {
    // Create a new sphere, add to wrapper and animate it
    
    // Crteate a new sphere
    let sphere = document.createElement('div')
    sphere.classList.add('sphere')
    sphere.classList.add(size)
    let sphere_text = document.createElement('span')
    sphere_text.innerHTML = text
    sphere.appendChild(sphere_text)

    // Add transsition
    sphere.style.transitionDuration = `${animation_time}s`

    // Add sphere to wrapper
    spheres_wrapper.appendChild(sphere)

    // Wait time after creation, based in size
    if (size == "small") {
        await sleep (animation_time/5)
    } else if (size == "medium") {
        await sleep (animation_time/4)
    } else if (size == "large") {
        await sleep (animation_time/3.5)
    }

    // Animate sphere
    sphere.style.transform = 'translateY(-100vh)'

}

async function create_spheres () {
    // Add new spheres with data from api

    // Infinity loop
    while (true) {

        // Query from api
        let {size, donor} = get_donation ()
        console.log ({size, donor})
    
        // Create sphere
        await create_sphere (size, donor)
    }

}

async function remove_spheres () {
    // Delete the firsts spheres after the animation
    
    // Wait for first sphere
    await sleep (animation_time + 2)

    while (true) {
        let last_sphere = spheres_wrapper.querySelector (".sphere:first-child")
        spheres_wrapper.removeChild(last_sphere)
    }

}


// Auto create and remove spheres
create_spheres () 
// remove_spheres ()

// Refresh screen on resize
window.addEventListener('resize', () => {
    location.reload()
});
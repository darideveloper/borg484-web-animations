animation_time = 15

// Get spheres wrapper
let spheres_wrapper = document.querySelector('.spheres')

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function create_sphere (size, text, photo) {
    // Create a new sphere, add to wrapper and animate it
    
    // Crteate a new sphere
    let sphere = document.createElement('div')
    sphere.classList.add('sphere')
    sphere.classList.add(size)
    let sphere_text = document.createElement('span')
    sphere_text.innerHTML = text
    let sphere_photo = document.createElement('img')
    sphere_photo.src = `./imgs/sample-donors/${photo}`
    sphere.appendChild(sphere_text)
    sphere.appendChild(sphere_photo)

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
    sphere.style.transform = 'translateY(-120vh)'

    // Calculate and set random margin
    let margin = Math.floor(Math.random() * (90)) - 10
    sphere.style.marginLeft = `${margin}vw`


}

async function create_spheres () {
    // Add new spheres with data from api

    // Infinity loop
    while (true) {

        // Query from api
        let {size, donor, photo} = get_donation ()
    
        // Create sphere
        await create_sphere (size, donor, photo)
    }

}

async function remove_spheres () {
    // Delete the firsts spheres after the animation
    
    // Wait for first sphere
    await sleep (animation_time + 2)

    while (true) {
        let last_sphere = spheres_wrapper.querySelector (".sphere:first-child")
        spheres_wrapper.removeChild(last_sphere)
        await sleep (animation_time)
    }

}


// Auto create and remove spheres
create_spheres () 
remove_spheres ()

// Refresh screen on resize
window.addEventListener('resize', () => {
    location.reload()
});
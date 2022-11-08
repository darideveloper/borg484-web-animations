// Html elemnts
const tree = document.querySelector (".tree")

// Time between show spheres
const wait_time = 1

function sleep(s) {
    // Wait specific time in seconds
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

async function generate () {

    // Z index value for each size
    const sizes_z_index = {
        s: 1,
        m: 2,
        l: 3,
        xl: 4,
    }
    const sizes_width = {
        s: 10,
        m: 13,
        l: 16,
        xl: 20,
    }
    let used_positions = []

    // Loop for generate spheres
    while (data.length > 0) {

        // Wait time between each animation
        await sleep (wait_time)

        // Get donation from api
        const donation = get_donation ()    

        // Create sphere
        const sphere = `
            <div class="sphere-wrapper hidden">
                <div class="sphere ${donation.size}">
                    <img class="donor" src="imgs/sample donors/${donation.img}" alt="donor photo">
                    <img class="sphere" src="imgs/sphere.png" alt="donation sphere">
                </div>
            </div>
        `

        // Add to page
        tree.innerHTML += sphere
        const current_sphere = tree.querySelector(".sphere-wrapper:last-child")

        // Set randomm position in x, without repetitions
        const size_width = sizes_width[donation.size]
        const max_width = screen.width - ((screen.width + 1)  * size_width / 100)
        let position
        let position_fixed 
        while (true) {
            position = Math.floor(Math.random() * max_width)
            position_fixed =  Math.round(position / 30) * 30

            if ( ! used_positions.includes (position_fixed)) {
                break
            }
        }
        current_sphere.style.left = `${position_fixed}px`
        
        // Set position in z, based in sizes
        z_index = sizes_z_index[donation.size]
        current_sphere.style.zIndex = z_index

        // Remove hidden class to show element
        await sleep (0.1)
        current_sphere.classList.remove ("hidden")

        // Save position of the current sphere
        used_positions.push (position_fixed)
    }
}

generate ()

const donors = [
  "Dari-Developer",
  "Sample-donor 1",
  "Sample-donor 2",
  "Sample-donor 3",
  "Sample-donor 4",
  "Sample-donor 5",
  "Sample-donor 6",
  "Sample-donor 7",
  "Sample-donor 8",
  "Sample-donor 9",
  "Sample-donor 10",
  "Sample-donor 11",
  "Sample-donor 12",
  "Sample-donor 13",
  "Sample-donor 14",
  "Sample-donor 15",
  "Sample-donor 16",
  "Sample-donor 17",
  "Sample-donor 18",
  "Sample-donor 19",
  "Sample-donor 20",
  "Sample-donor 21",
  "Sample-donor 22",
  "Sample-donor 23",
  "Sample-donor 24",
  "Sample-donor 25",
  "Sample-donor 26",
  "Sample-donor 27",
  "Sample-donor 28",
  "Sample-donor 29",
  "Sample-donor 30",
]

// Find a random leaf that hasn't been used yet
let leaves = document.querySelectorAll('#svg-group .leaf:not(.used)')

// Loop each donor to wriote name over leaf
let used_laves = []
function write_donors() {
  // Add donors names to random leaves

  // Get size of the svg
  let svg_elem = document.querySelector('svg')

  for (const donor of donors) {
  
    // Find free leaf
    let leaf = leaves[Math.floor(Math.random() * leaves.length)]
    while (used_laves.includes(leaf)) {
      leaf = leaves[Math.floor(Math.random() * leaves.length)]
    }

    // Save used leaf
    used_laves.push(leaf)

    // Get properties
    let leaf_content = leaf.querySelector("g")
    let leaf_path = leaf.querySelector("path")
    let leaf_width = leaf_content.getBBox().height
    let leaf_transform_rotation = leaf_content.style.transform.split('(')[1].split(')')[0].split(',')[3].replace('deg', '')
    leaf_transform_rotation = parseInt(leaf_transform_rotation)

    // Fix styles
    leaf_transform_rotation = 90 + leaf_transform_rotation

    // Remove leaf styles from html
    leaf.classList.add('pre-used')
    leaf_path.removeAttribute('style')

    // Set used class
    setTimeout(() => leaf.classList.add('used'), 100)

    // add new text and get it
    donor_lines = donor.split('-')

    leaf.innerHTML += `<text x="0" y="0" style="font-size: ${leaf_width/12*1.8}px; transform: rotate3d(0, 0, 1, ${leaf_transform_rotation}deg) translate(${leaf_width/2}px, -${leaf_width/12}px);">${donor_lines[0]}</text>`

    leaf.innerHTML += `<text x="0" y="0" style="font-size: ${leaf_width/12*1.8}px; transform: rotate3d(0, 0, 1, ${leaf_transform_rotation}deg) translate(${leaf_width/2}px, ${leaf_width/12}px);">${donor_lines[1]}</text>`

    // Update size of svg
    leaf_transform = leaf.style.transform += " scale(0.8)"
    leaf.style.transform = leaf_transform
  }
}

function show_donors () {
  // DIsplay donors names already addeed

  let text_wrapper = document.querySelectorAll('text')
  text_wrapper.forEach((text) => {
    text.classList.add('visible')
  })
}

// Set names when load
setTimeout(write_donors, 4000)
setTimeout(show_donors, 4100)

// Refresh when resize
window.addEventListener('resize', () => {
  window.location.reload()
}, false);


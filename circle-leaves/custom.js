const donnors = [
  "Dari Developer",
  "Sample donnor 1",
  "Sample donnor 2",
  "Sample donnor 3",
  "Sample donnor 4",
  "Sample donnor 5",
  "Sample donnor 6",
  "Sample donnor 7",
  "Sample donnor 8",
  "Sample donnor 9",
  "Sample donnor 10",
  "Sample donnor 11",
  "Sample donnor 12",
  "Sample donnor 13",
  "Sample donnor 14",
  "Sample donnor 15",
  "Sample donnor 16",
  "Sample donnor 17",
  "Sample donnor 18",
  "Sample donnor 19",
  "Sample donnor 20",
  "Sample donnor 21",
  "Sample donnor 22",
  "Sample donnor 23",
  "Sample donnor 24",
  "Sample donnor 25",
  "Sample donnor 26",
  "Sample donnor 27",
  "Sample donnor 28",
  "Sample donnor 29",
  "Sample donnor 30",
]


// Loop each donnor to wriote name over leaf
let used_laves = []
function write_donors() {

  // Find a random leaf that hasn't been used yet
  let leaves = document.querySelectorAll('#svg-group .leaf:not(.used)')

  // Get size of the svg
  let svg_elem = document.querySelector('svg')
  let svg_style = window.getComputedStyle(svg_elem)
  let svg_width = svg_style.width
  let svg_height = svg_style.height

  // Get wrapper of texts
  let text_wrapper = document.querySelector('.text-wrapper')
  let text_wrapper_content = text_wrapper.querySelector('.content')
  text_wrapper.style.width = svg_width
  text_wrapper.style.height = svg_height

  for (const donnor of donnors) {
  
    // Find free leaf
    let leaf = leaves[Math.floor(Math.random() * leaves.length)]
    while (used_laves.includes(leaf)) {
      leaf = leaves[Math.floor(Math.random() * leaves.length)]
    }

    leaf.classList.add('used')

    // Get styles from leaf
    // let leaf_transform_x = leaf.style.transform.split('(')[1].split(')')[0].split(',')[0].replace('px', '')
    // let leaf_transform_y = leaf.style.transform.split('(')[1].split(')')[0].split(',')[1].replace('px', '')
    // let leaf_styles = window.getComputedStyle(leaf)
    let leaf_content = leaf.querySelector("g")
    // let leaf_height = leaf_styles.height.replace('px', '')
    // let leaf_width = leaf_styles.width.replace('px', '')
    // let leaf_height = leaf_content.getBBox().width
    let leaf_width = leaf_content.getBBox().height
    let leaf_transform_rotation = leaf_content.style.transform.split('(')[1].split(')')[0].split(',')[3].replace('deg', '')
    // const leaf_box_x = parseInt(leaf.getBBox().x)
    // const leaf_box_y = leaf.getBBox().y

    // Convert styles to int
    // leaf_transform_x = parseInt(leaf_transform_x)
    // leaf_transform_y = parseInt(leaf_transform_y)
    leaf_transform_rotation = parseInt(leaf_transform_rotation)

    // Fix styles
    leaf_transform_rotation = 90 + leaf_transform_rotation
    // leaf_transform_x = leaf_transform_x + leaf_box_x
    // leaf_transform_y = leaf_transform_y + leaf_box_y
  
    // add new text and get it
    leaf.innerHTML += `<text x="0" y="0" style="font-size: ${leaf_width/12}px; transform: rotate3d(0, 0, 1, ${leaf_transform_rotation}deg) translate(${leaf_width/5.6}px, ${leaf_width/22}px);">${donnor}</text>`
    let text = text_wrapper_content.lastElementChild

  }
}

// Set names when load
setTimeout(write_donors, 3000)

// Refresh when resize
window.addEventListener('resize', () => {
  window.location.reload()
}, false);


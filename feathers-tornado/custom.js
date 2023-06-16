// // Loop each donor to wriote name over leaf
// let used_laves = []
// function write_donors() {
//   // Add donors names to random leaves

//   // Find a random leaf that hasn't been used yet
//   let leaves = Array.from(document.querySelectorAll('#leaves > g:not(.used)')).slice(0, 94)
//   console.log ({leaves})

//   // Get size of the svg
//   let svg_elem = document.querySelector('svg')

//   for (const donor of donors) {
  
//     // Find free leaf
//     let leaf = leaves[Math.floor(Math.random() * leaves.length)]
//     while (used_laves.includes(leaf)) {
//       leaf = leaves[Math.floor(Math.random() * leaves.length)]
//     }

//     // Save used leaf
//     used_laves.push(leaf)

//     // Get properties
//     let leaf_content = leaf
//     let leaf_path = leaf.querySelector("path")
//     let leaf_width = leaf_content.getBBox().height
//     console.log (leaf_content.style.transform.split('(')[2].split(')')[0].split(',')[3])
//     let leaf_transform_rotation = leaf_content.style.transform.split('(')[2].split(')')[0].split(',')[3].replace('deg', '')
//     leaf_transform_rotation = parseInt(leaf_transform_rotation)

//     // Fix styles
//     leaf_transform_rotation = leaf_transform_rotation

//     // Remove leaf styles from html
//     leaf.classList.add('pre-used')
//     leaf_path.removeAttribute('style')

//     // Set used class
//     setTimeout(() => leaf.classList.add('used'), 100)

//     // add new text and get it
//     donor_lines = donor.split('-')

//     leaf.innerHTML += `<text x="0" y="0" style="font-size: ${leaf_width/12*1.8}px; transform: rotate3d(0, 0, 1, ${leaf_transform_rotation}deg) translate(${leaf_width/2}px, -${leaf_width/12}px);">${donor_lines[0]}</text>`

//     leaf.innerHTML += `<text x="0" y="0" style="font-size: ${leaf_width/12*1.8}px; transform: rotate3d(0, 0, 1, ${leaf_transform_rotation}deg) translate(${leaf_width/2}px, ${leaf_width/12}px);">${donor_lines[1]}</text>`

//     // Update size of svg
//     leaf_transform = leaf.style.transform += " scale(0.8)"
//     leaf.style.transform = leaf_transform
//   }
// }

// function show_donors () {
//   // DIsplay donors names already addeed

//   let text_wrapper = document.querySelectorAll('text')
//   text_wrapper.forEach((text) => {
//     text.classList.add('visible')
//   })
// }

// // Set names when load
// setTimeout(write_donors, 4000)
// setTimeout(show_donors, 4100)

// // Refresh when resize
// window.addEventListener('resize', () => {
//   window.location.reload()
// }, false);


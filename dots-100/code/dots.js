const dotsWrapper = document.querySelector('.dots')
const maxDots = 1300

function createDots() {
  console.log('Creating dots')
  for (let i = 0; i < maxDots; i++) {
    console.log('Creating dot')
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dotsWrapper.appendChild(dot)
  }
}


function isOverValidDiv(mainElement, validDivs, invalidDivs) {
  // Get the bounding rectangle of the main element
  const mainRect = mainElement.getBoundingClientRect();

  // Helper function to check overlap
  const isOverlapping = (rect1, rect2) => {
      return !(
          rect1.right < rect2.left || 
          rect1.left > rect2.right || 
          rect1.bottom < rect2.top || 
          rect1.top > rect2.bottom
      );
  };

  // Check if it's overlapping any invalid div
  for (let invalidDiv of invalidDivs) {
      const invalidRect = invalidDiv.getBoundingClientRect();
      if (isOverlapping(mainRect, invalidRect)) {
          return false; // It's over an invalid div
      }
  }

  // Check if it's overlapping any valid div
  for (let validDiv of validDivs) {
      const validRect = validDiv.getBoundingClientRect();
      if (isOverlapping(mainRect, validRect)) {
          return true; // It's over a valid div and no invalid divs
      }
  }

  // Default: not over any valid div
  return false;
}


// Create dots grid
createDots()

// // Apply over class to valid dots 
const dots = document.querySelectorAll('.dot')
const validDivs = document.querySelectorAll('.over')
const invalidDivs = document.querySelectorAll('.not-over')
console.log({ dots, validDivs, invalidDivs })
for (const dot of dots) {
  const dotOver = isOverValidDiv(dot, validDivs, invalidDivs)
  if (dotOver) {
    dot.classList.add('over')
  }
  console.log({ dotOver, dot })
}

// Function to get the CSS custom property value
function getCSSVariable(variable) {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue(variable))
}

// Function to create the grid of dots
function createDotGrid() {
  const container = document.getElementById('dot-container')
  container.innerHTML = ''  // Clear any existing dots

  const dotSize = getCSSVariable('--dot-size')
  const dotSpace = getCSSVariable('--dot-space')

  // Calculate how many rows and columns based on container width and height
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  const cols = Math.floor(containerWidth / (dotSize + dotSpace))
  const rows = Math.floor(containerHeight / (dotSize + dotSpace))

  // Create the dots based on the grid dimensions
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.style.width = `${dotSize}px`
      dot.style.height = `${dotSize}px`

      container.appendChild(dot)
    }
  }
}

// Function to check if a dot is over the target div (circle)
function isDotOverTarget(dot, targetDiv) {
  const dotRect = dot.getBoundingClientRect();
  const targetRect = targetDiv.getBoundingClientRect();

  // Target circle center coordinates
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;

  // Dot coordinates
  const dotCenterX = dotRect.left + dotRect.width / 2;
  const dotCenterY = dotRect.top + dotRect.height / 2;

  // Calculate distance between centers
  const distance = Math.sqrt(
    Math.pow(dotCenterX - targetCenterX, 2) + Math.pow(dotCenterY - targetCenterY, 2)
  );

  // Check if the dot is inside the circular target area
  const targetRadius = targetRect.width / 2; // Assuming the target is a circle
  const isOver = distance <= targetRadius;

  console.log({ isOver, dot, targetDiv, distance, targetRadius });
  
  return isOver;
}


// Initial grid setup
createDotGrid()

setTimeout(() => {
  const dots = document.querySelectorAll('.dot');
  for (const dot of dots) {
    const targetDiv = document.querySelector('.cero-1');
    const isOver = isDotOverTarget(dot, targetDiv);
  
    if (isOver) {
      dot.classList.add('over');
    } else {
      dot.classList.remove('over');
    }
  }
}, 100);
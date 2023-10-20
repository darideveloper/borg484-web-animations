class Render {

  /**
   * 3D setup
   */
  constructor() {

    var supports3DTransforms = document.body.style['perspectiveProperty'] !== undefined ||
      document.body.style['WebkitPerspective'] !== undefined ||
      document.body.style['MozPerspective'] !== undefined ||
      document.body.style['msPerspective'] !== undefined ||
      document.body.style['OPerspective'] !== undefined

    if (!supports3DTransforms) {
      alert('Your browser doesn\'t support CSS3 3D transforms :/')
    }

    

    this.width = 250
    this.height = 300

    this.tree = document.querySelector('.tree')

    this.tree.style.width = this.width + 'px'
    this.tree.style.height = this.height + 'px'

    // resize when screen size change
    window.addEventListener('resize', this.resize, false)

    // Resize when load
    this.resize ()
  }

  
  /**
   * Fize size of the wrapper
   */
  resize () {
    this.tree.style.top = ((window.innerHeight - this.height - 20) / 2) + 'px'
  }

  /**
   * Apply transform values to element
  */
  transform(element, value) {
    element.style.WebkitTransform = value
    element.style.MozTransform = value
    element.style.msTransform = value
    element.style.OTransform = value
    element.style.transform = value
  }

  /**
   * Render new heart
  */
  addDonation () {
    var element = document.createElement('img')
    element.setAttribute('src', './imgs/heart.png')
    element.classList.add("heart-img")

    var spread = this.width * 4

    var x = Math.round(Math.random() * spread) - (spread / 4),
      y = Math.round(Math.random() * this.height),
      z = Math.round(Math.random() * spread) - (spread / 2)

    var rx = 0,
      ry = Math.random() * 360,
      rz = 0

    if (Math.random() > 0.5) element.setAttribute('checked', '')

    this.transform(element, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)')

    this.tree.appendChild(element)

    console.log ("donation added")
  }
}

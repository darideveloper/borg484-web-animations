export function donationIn () {
  let timeline = anime.timeline({
    easing: 'easeInSine'
  })
  timeline
  .add ({
    targets: '.donation',
    translateY: '0vw',
    translateX: '0vw',
    rotateZ: 0,
    duration: 0,
    easing: 'easeInSine'
  })
  .add ({
    targets: '.donation',
    translateY: '32vw',
    duration: 2000,
    easing: 'easeInSine'
  })
}

export function donationOut () {
  let timeline = anime.timeline({
    easing: 'easeInSine'
  })
  
  timeline
  .add ({
    targets: '.wire.right',
    translateY: '4vw',
    duration: 1500
  })
  .add ({
    targets: '.beam',
    rotateZ: 8,
    translateY: '2vw',
    translateX: '0.25vw',
    duration: 1500
  }, '-=1500')
  .add ({
    targets: '.donation',
    translateY: '42vw',
    translateX: '60vw',
    rotateZ: 180,
    duration: 1500
  }, '-=1200')
  .add ({
    targets: '.wire.right',
    translateY: '0vw',
    duration: 1500
  }, '+=300')
  .add ({
    targets: '.beam',
    rotateZ: 0,
    translateY: '0vw',
    translateX: '0vw',
    duration: 1500
  }, '-=1500')
}
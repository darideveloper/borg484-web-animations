var $pinata = $('#pinata-body'),
    pinataLeft,
    pinataTop,
    tween = TweenMax.from('#pinata', 3, {
      y: -50,
      ease: Elastic.easeOut
    }),
    tl = new TimelineMax({repeat: -1}),
    tweenEye = TweenMax.to('.pinata-eye', 10, {
      rotation: 720,
      transformOrigin: '90% 55%',
      ease: Elastic.easeOut,
      paused: true
    });

tl.to('#pinata', 0.5, {
    transformOrigin: 'center top',
    rotation: 3,
    repeat: 1,
    yoyo: true,
    ease: Sine.easeOut
  })
  .to('#pinata', 0.5, {
    transformOrigin: 'center top',
    rotation: -3,
    repeat: 1,
    yoyo: true,
    ease: Sine.easeOut
  })
  
// Falling

// Exploding
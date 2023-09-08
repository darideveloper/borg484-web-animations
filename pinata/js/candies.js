// Matter.js - http://brm.io/matter-js/
var Example = Example || {}
let world 

Example.timescale = function () {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Events = Matter.Events,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies

  // create engine
  var engine = Engine.create()
  world = engine.world

  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: '#fff'
    }
  })

  Render.run(render)

  // create runner
  var runner = Runner.create()
  Runner.run(runner, engine)

  // add bodies
  World.add(world, [
    Bodies.rectangle(window.innerWidth / 4, 0, window.innerWidth * 1.5, 10, { isStatic: true, render: { fillStyle: '#fff' } }),
    Bodies.rectangle(window.innerWidth / 4, window.innerHeight, window.innerWidth * 1.5, 10, { isStatic: true, render: { fillStyle: '#fff' } }),
    Bodies.rectangle(window.innerWidth - 10, window.innerHeight / 2, 10, window.innerWidth, { isStatic: true, render: { fillStyle: '#fff' } }),
    Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerWidth, { isStatic: true, render: { fillStyle: '#fff' } })
  ])

  var explosion = function (engine) {
    var bodies = Composite.allBodies(engine.world)

    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i]

      if (!body.isStatic && body.position.y >= 500) {
        var forceMagnitude = 0.05 * body.mass

        Body.applyForce(body, body.position, {
          x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
          y: -forceMagnitude + Common.random() * -forceMagnitude
        })
      }
    }
  }

  var timeScaleTarget = 1,
    counter = 0


  Events.on(engine, 'afterUpdate', function (event) {
    // tween the timescale for bullet time slow-mo
    engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05

    counter += 1

    // every 1.5 sec
    if (counter >= 60 * 1.5) {

      // flip the timescale
      if (timeScaleTarget < 1) {
        timeScaleTarget = 1
      } else {
        timeScaleTarget = 0.05
      }

      // create some random forces
      explosion(engine)

      // reset counter
      counter = 0
    }
  })

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    })

  World.add(world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: {
      x: window.innerWidth,
      y: window.innerHeight
    }
  })

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    }
  }
}

// create demo interface
// not required to use Matter.js

MatterTools.Demo.create({
  toolbar: {
    title: 'matter-js',
    url: 'https://github.com/liabru/matter-js',
    reset: true,
    source: true,
    fullscreen: true,
    exampleSelect: true
  },
  preventZoom: true,
  resetOnOrientation: true,
  examples: [
    {
      name: 'Time Scaling',
      id: 'timescale',
      init: Example.timescale,
      sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/timescale.js'
    }
  ]
})
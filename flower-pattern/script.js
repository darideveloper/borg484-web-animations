import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18.2/+esm'

const canvasEl = document.querySelector("#flowers-pattern");

const mouseThreshold = .6;
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

const mouse = {
    x: -.5 * window.innerWidth,
    y: .5 * window.innerHeight,
    tX: -.5 * window.innerWidth,
    tY: .5 * window.innerHeight,
}

const params = {
    scale: 15,
    petalsNumber: 5,
    flowerThickness: .4,
    floatingSpeed: 1,
    visibility: 0,
    backDarkness: .6,
}

let uniforms;
const gl = initShader();
createControls();

render();
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});
canvasEl.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

function updateMousePosition(eX, eY) {
    mouse.tX = eX;
    mouse.tY = eY;
}


function initShader() {
    const vsSource = document.getElementById("vertShader").innerHTML;
    const fsSource = document.getElementById("fragShader").innerHTML;

    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

    if (!gl) {
        alert("WebGL is not supported by your browser.");
    }

    function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

    function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    uniforms = getUniforms(shaderProgram);

    function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(uniforms.u_scale, params.scale);
    gl.uniform1f(uniforms.u_petals_number, params.petalsNumber);
    gl.uniform1f(uniforms.u_flower_thickness, params.flowerThickness);
    gl.uniform1f(uniforms.u_def_floating, params.floatingSpeed);
    gl.uniform1f(uniforms.u_visibility, params.visibility);
    gl.uniform1f(uniforms.u_back_darkness, params.backDarkness);

    return gl;
}

function render() {
    const currentTime = performance.now();

    gl.uniform1f(uniforms.u_time, currentTime);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    mouse.x += (mouse.tX - mouse.x) * mouseThreshold;
    mouse.y += (mouse.tY - mouse.y) * mouseThreshold;

    gl.uniform2f(uniforms.u_pointer, mouse.x / window.innerWidth, 1. - mouse.y / window.innerHeight);
    requestAnimationFrame(render);
}

function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
}

function createControls() {
    const gui = new GUI();
    gui.add(params, "scale", 5, 15, .01)
        .name("scale")
        .onChange(v => {
            gl.uniform1f(uniforms.u_scale, v);
        });
    gui.add(params, "petalsNumber", 4, 8, 1)
        .name("petals number")
        .onChange(v => {
            gl.uniform1f(uniforms.u_petals_number, v);
        });
    gui.add(params, "flowerThickness", .2, .8)
        .name("flower thickness")
        .onChange(v => {
            gl.uniform1f(uniforms.u_flower_thickness, v);
        });
    gui.add(params, "floatingSpeed", .5, 3, .5)
        .name("floating speed")
        .onChange(v => {
            gl.uniform1f(uniforms.u_def_floating, v);
        });
    gui.add(params, "visibility", .1, 1, .01)
        .onChange(v => {
            gl.uniform1f(uniforms.u_visibility, v);
        });
    gui.add(params, "backDarkness", 0, 1, .01)
        .name("background darkness")
        .onChange(v => {
            gl.uniform1f(uniforms.u_back_darkness, v);
        });
}


// ------------------------------
// Custom JS

export class Render {
  
  constructor(goalAmount, initialAmount) {

    // Save initial values
    this.goalAmount = goalAmount;
    this.currentAmount = initialAmount;

    // First render
    this.updateVisibility()
  }

  /**
   * Render flowers based in donations
   * @param {int} goal
   * @param {int} initialAmount
   */
  updateVisibility() {
    // Calculate percentage of donations
    const percentage = this.currentAmount / this.goalAmount;

    // Render
    gl.uniform1f(uniforms.u_visibility, percentage);
  }

  addDonation(amount) {
    this.currentAmount += amount;
    this.updateVisibility();
  }

}

/*
 * Author: Bhaswar Chakraborty
 * Department of Computer Science
 * Scottish Church College, Kolkata
 */

const flowfield = []
const points = []

let grid, cols, rows, n

const props = {
    particleVisible: true,
    drawBackground: true,
    showFieldBack: false,
    fieldBackVisible: false,
}

function setup() {
    createCanvas((w = windowWidth), (h = windowHeight))
    fieldBuff = createGraphics(w, h)

    grid = min(w, h) / 70
    n = w * 4
    rows = floor(h / grid) + 1
    cols = floor(w / grid) + 1
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let angle = noise(i * 0.1, j * 0.1) * TAU
            let v = createVector(cos(angle), sin(angle))
            flowfield.push(v)
        }
    }

    pointsInit()
    createFieldBuffer()

    // noLoop();

    background(10)
}

function draw() {
    if (!props.particleVisible) {
        background(10)
        tint(255, 200)
        image(fieldBuff, 0, 0)
        return
    }
    if (props.drawBackground) {
        background(10)
        props.drawBackground = false
    }
    drawParticles()
    if (props.showFieldBack && !props.fieldBackVisible) {
        tint(255, 100)
        image(fieldBuff, 0, 0)
        props.fieldBackVisible = true
        props.showFieldBack = false
    }
}

function drawParticles() {
    for (let p of points) {
        let x = floor(p.x / grid),
            y = floor(p.y / grid)
        let index = x + y * cols
        let force = flowfield[index]
        p.add(force)

        stroke(255, 50)
        point(p.x, p.y)
    }
}

function createFieldBuffer() {
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let index = i + j * cols
            fieldBuff.push()
            fieldBuff.translate(i * grid + grid / 2, j * grid + grid / 2)
            fieldBuff.rotate(flowfield[index].heading())
            fieldBuff.strokeWeight(0.5)
            fieldBuff.stroke(255)
            fieldBuff.line(0, 0, grid, 0)
            fieldBuff.fill(255)
            fieldBuff.circle(grid, 0, 1)
            fieldBuff.pop()
        }
    }
}

function keyPressed() {
    if (keyCode == 81) {
        props.particleVisible = !props.particleVisible
        if (props.particleVisible) {
            props.drawBackground = true
            pointsInit()
        }
        props.fieldBackVisible = false
    }
    if (keyCode == 87) props.showFieldBack = !props.showFieldBack
}

function pointsInit() {
    for (let i = 0; i < n; i++) {
        points[i] = createVector(random(w), random(h))
    }
}

/*
 * Author: Bhaswar Chakraborty
 * Department of Computer Science
 * Scottish Church College, Kolkata
 */

const flowfield = []
const points = []

let grid, cols, rows, n
let particleVisible = true

function setup() {
    createCanvas((w = windowWidth), (h = windowHeight))

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

    for (let i = 0; i < n; i++) {
        points[i] = createVector(random(w), random(h))
    }

    // noLoop();

    background(10)
}

function draw() {
    if (!particleVisible) {
        drawField()
        return
    }
    drawParticles()
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

function drawField() {
    background(10)
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let index = i + j * cols
            push()
            translate(i * grid + grid / 2, j * grid + grid / 2)
            rotate(flowfield[index].heading())
            strokeWeight(0.5)
            stroke(255)
            line(0, 0, grid, 0)
            circle(grid, 0, 1)
            pop()
        }
    }
}

function keyPressed() {
    if (keyCode == 81) particleVisible = !particleVisible
}

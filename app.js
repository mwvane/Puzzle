import Cube from "./cube.js";
import Constant from "./constants.js"
import Figure from "./figures.js"
import helpers from "./helpers.js"

let currentFigures = []
let draggingFigure = null

start()
function start() {
    let container = document.getElementsByClassName("cube-container")[0]
    drawTable(container)
    drawFigures()
}
function drawTable(parent) {
    let startX = 0
    let startY = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cube = new Cube(startX, startY)
            cube.element.className = "cube"
            parent.append(cube.element)
            startX += Constant._CUBE_WIDTH + 4
        }
        startX = 0
        startY += Constant._CUBE_HEIGHT + 4
    }
}
function drawFigures(quantity = 3) {
    let figure = new Figure(Constant._FIGURES)
    let figureContainer = document.getElementsByClassName("figures-container")[0]
    for (let i = 0; i < quantity; i++) {
        let randFigure = figure.Figures[helpers.getRandomNUmber(0, figure.Figures.length)].cloneNode(true)
        currentFigures.push(randFigure)
        figureContainer.append(randFigure)
        randFigure.addEventListener("mousedown", e => {
            draggingFigure = randFigure
            figure.disable(draggingFigure)
            randFigure.offsetX = e.pageX - randFigure.offsetLeft
            randFigure.offsetY = e.pageY - randFigure.offsetTop
            window.addEventListener("mousemove", drag)
        })
        randFigure.addEventListener("mouseup", up => {
            window.removeEventListener("mousemove",drag)
            draggingFigure = null
        })

    }
}

function drag(e) {
    draggingFigure.style.position = "absolute"
    draggingFigure.style.top = `${e.pageY - draggingFigure.offsetY}px`
    draggingFigure.style.left = `${e.pageX - draggingFigure.offsetX}px`
}


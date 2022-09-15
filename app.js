import Cube from "./cube.js";
import constant from "./constants.js"
import Figure from "./figures.js"
import helpers from "./helpers.js"

let currentFigures = []
let draggingFigure = null
let tableCubes = []

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
            let cube = new Cube()
            cube.setTop(startY)
            cube.setLeft(startX)
            cube.element.className = "cube"
            parent.append(cube.element)
            console.log(cube.getWidth)
            tableCubes.push(cube)
            startX += constant._CUBE_WIDTH + 4
        }
        startX = 0
        startY += constant._CUBE_HEIGHT + 4
    }
}
function drawFigures(quantity = 3) {
    currentFigures = []
    let figureContainer = document.getElementsByClassName("figures-container")[0]
    for (let i = 0; i < quantity; i++) {
        let figure = new Figure(constant._FIGURES[helpers.getRandomNUmber(0, constant._FIGURES.length)],20)
        currentFigures.push(figure)
        figureContainer.append(figure.element)
        figure.element.addEventListener("mousedown", e => {
            draggingFigure = figure
            let newFigure = new Figure(draggingFigure.code,constant._CUBE_WIDTH)
            document.body.append(newFigure.element)
            newFigure.setLeft = `${e.clientX}px`
            newFigure.setTtop = `${e.clientY}px`
            figure.disable(draggingFigure)
            figure.offsetX = e.pageX - figure.absoluteLeft
            figure.offsetY = e.pageY - figure.absoluteTop
            window.addEventListener("mousemove", drag)
        })
        figure.element.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", drag)
            draggingFigure = null
        })

    }
}

function drag(e) {
    let figure = draggingFigure
    figure.element.style.position = "absolute"
    figure.setTop(e.pageY - figure.offsetY)
    figure.setLeft(e.pageX - figure.offsetX)
    check(draggingFigure)
}

function check(figureObj) {
    let startFigure = null
    let figure = figureObj.element
    let maxBottom = tableCubes[tableCubes.length-1].absoluteBottom
    if (figureObj.absoluteBottom <= maxBottom) {
        for (let cube of tableCubes) {
            if (cube.absoluteLeft <= figureObj.absoluteLeft + correction(figureObj) && cube.absoluteRight >= figureObj.absoluteLeft + correction(figureObj)) {
                if (cube.absoluteTop <= figureObj.absoluteTop + correction(figureObj) && cube.absoluteBottom >= figureObj.absoluteTop + correction(figureObj)) {
                    cube.setBackgroundColor("red")
                }
            }
        }
    }

}

function correction(figureObj){
    let temp = 0
    for(let char of figureObj.code){
        if(char === "1"){
            return temp
        }
        temp += 22
    }
    return temp
}


import Cube from "./cube.js";
import constant from "./constants.js"
import Figure from "./figures.js"
import helpers from "./helpers.js"

let currentFigures = []
let currentFigure = null
let draggingFigure = null
let tableCubes = []
let startIndex = -1
let scoreElement = document.getElementsByClassName('score')[0]
let score = 0
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
        let figure = new Figure(constant._FIGURES[helpers.getRandomNUmber(0, constant._FIGURES.length)], 20)
        currentFigures.push(figure)
        figureContainer.append(figure.element)
        figure.element.addEventListener("mousedown", e => {
            currentFigure = figure
            draggingFigure = new Figure(figure.code, constant._CUBE_WIDTH)
            document.body.append(draggingFigure.element)
            draggingFigure.offsetX = e.pageX - figure.absoluteLeft
            draggingFigure.offsetY = e.pageY - figure.absoluteTop
            draggingFigure.setLeft(e.clientX - draggingFigure.offsetX)
            draggingFigure.setTop(-draggingFigure.offsetY)
            figure.disable()
            window.addEventListener("mousemove", drag)
            window.addEventListener("mouseup", function tmpMouseup() {
                window.removeEventListener("mouseup", tmpMouseup)
                mouseUp()
            })
        })


    }
    console.log('drawfigures called');


}

function mouseUp() {
    console.log("mose up calledd is start index ", startIndex);
    if (isCompatible(startIndex)) {
        putFigure()
        currentFigure.remove()
        currentFigures = removeFromArray(currentFigure, currentFigures)
        if (currentFigures.length == 0) {
            drawFigures()
        }
    }
    window.removeEventListener("mousemove", drag)
}

function drag(e) {
    let figure = draggingFigure
    figure.element.style.position = "absolute"
    figure.setTop(e.pageY - figure.offsetY)
    figure.setLeft(e.pageX - figure.offsetX)
    check(draggingFigure)
}

function check(figureObj) {
    let maxBottom = tableCubes[tableCubes.length - 1].absoluteBottom + 20
    let minLeft = tableCubes[0].absoluteLeft
    let maxRight = tableCubes[tableCubes.length - 1].absoluteRight + 80
    if (figureObj.absoluteBottom <= maxBottom) {
        if (figureObj.absoluteLeft >= minLeft && figureObj.absoluteRight <= maxRight) {
            for (let [index, cube] of tableCubes.entries()) {
                if (cube.absoluteLeft <= figureObj.absoluteLeft + correction(figureObj) && cube.absoluteRight >= figureObj.absoluteLeft + correction(figureObj)) {
                    if (cube.absoluteTop <= figureObj.absoluteTop && cube.absoluteBottom >= figureObj.absoluteTop) {
                        startIndex = index
                        if (isCompatible(index)) {
                            hilight(draggingFigure.gridIndexes, index)
                        }
                    }
                }
            }
        } else {
            unHilight(draggingFigure.gridIndexes)
            startIndex = -1
        }

    } else {
        unHilight(draggingFigure.gridIndexes)
        startIndex = -1
    }

}

function correction(figureObj) {
    let temp = 0
    for (let char of figureObj.code) {
        if (char === "1") {
            return temp
        }
        temp += constant._CUBE_WIDTH
    }
    return temp
}

function isCompatible(startIndex) {
    for (let index of draggingFigure.gridIndexes) {
        if (tableCubes[startIndex + index]) {
            if (!tableCubes[startIndex + index].isEmpty) {
                return false
            }
        }
    }
    return true
}

let last = -1
function hilight(indexes, startIndex) {
    if (startIndex != last && last != -1) {
        unHilight(indexes)
    }
    else {
        for (let index of indexes) {
            tableCubes[startIndex + index].setBackgroundColor(constant._HILIGHT_COLOR)
        }
    }
    last = startIndex
}

function unHilight(indexes) {
    if (last != -1) {
        for (let index of indexes) {
            if (tableCubes[last + index]) {
                if (tableCubes[last + index].isEmpty) {
                    tableCubes[last + index].setBackgroundColor(constant._EMPTY_CUBE_COLOR)
                }
            }
        }
    }
}

function putFigure() {
    for (let index of draggingFigure.gridIndexes) {
        if (tableCubes[startIndex + index]) {
            tableCubes[startIndex + index].isEmpty = false
        }
    }
    draggingFigure.remove()
    checkTable()

}

function removeFromArray(item, array) {
    return array.filter(i => i != item)
}

function checkTable() {
    let indexes = []
    for (let index of draggingFigure.gridIndexes) {
        let startIndexV = (startIndex + index) % 8
        let startIndexH = startIndex + index - ((startIndex + index) % 8)
        let tmpArrayV = []
        let tmpArrayH = []
        for (let j = 0; j < 8; j++) {
            tmpArrayV.push(startIndexV + j * 8)
            tmpArrayH.push(startIndexH + j)
        }
        if (isLineFull(tmpArrayV)) {
            indexes = indexes.concat(tmpArrayV)
        }
        if(isLineFull(tmpArrayH)){
            indexes = indexes.concat(tmpArrayH)
        }
    }
    if(indexes.length > 0){
    removeLine(indexes)
    }
}

function isLineFull(array) {
    for (let i = 0; i < array.length; i++) {
        if (tableCubes[array[i]].isEmpty) {
            return false
        }
    }
    return true
}

function removeLine(array) {
    let counter = 0
    setInterval(()=>{
        if(counter < array.length){
            tableCubes[array[counter]].isEmpty = true
        }
        counter++
    },15)
    score += array.length / 8
    scoreElement.innerHTML = `${score}`
}


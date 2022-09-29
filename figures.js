import Cube from "./cube.js"
import constant from "./constants.js"
import Renderer from "./renderer.js"
export default class Figure extends Renderer {
    constructor(pattern, cubeSize) {
        super()
        this.cubeSize = cubeSize
        this.element = this.renderFigure(pattern)
        this.draggable = false
        this.offsetX = 0
        this.offsetY = 0
        this.code = pattern
        this.gridIndexes = this.#getGridIndexes()
    }

    renderFigure(code) {
        let startX = 0
        let startY = 0
        let figureWidth = 0
        let container = document.createElement("div")
        container.style.position = 'relative'
        for (let i = 0; i < code.length; i++) {
            if (code[i] === '1') {
                let cube = new Cube()
                cube.setBackgroundColor(constant._DEFAULT_FIGURE_COLOR)
                cube.setWidth(this.cubeSize)
                cube.setHeight(this.cubeSize)
                cube.setTop(startY)
                cube.setLeft(startX)
                cube.element.className = "cube"
                cube.element.style.position = "absolute"
                container.append(cube.element)
                startX += this.cubeSize + 2
            }
            else if (code[i] === 'n') {
                startY += this.cubeSize + 2
                if(figureWidth == 0){
                    figureWidth = startX
                }
                startX = 0
            }
            else if (code[i] === '0') {
                startX += this.cubeSize + 2
            }
        }
        container.style.height = `${startY + this.cubeSize}px`
        container.style.width = `${figureWidth + this.cubeSize}px`
        return container
    }

    disable() {
        this.#setBackgrounColor(constant._DISABLED_CUBE_COLOR)
    }

    clear(figure) {
        // this.#setColor(figure,constant._EMPTY_CUBE_COLOR)
    }

    full(figure) {
        this.#setBackgrounColor(constant._DEFAULT_FIGURE_COLOR)
    }
    #setBackgrounColor(color) {
        for (let child of this.element.childNodes) {
            child.style.backgroundColor = color
        }
    }
    #getGridIndexes() {
        let indexes = []
        let lines = this.code.split('n')
        let firsOneIndex = -1

        for (let i = 0; i < lines.length; i++) {
            if (i == 0) {
                for (let j = 0; j < lines[i].length; j++) {
                    if (lines[i][j] === '1' && firsOneIndex < 0) {
                        indexes.push(0)
                        firsOneIndex = j
                    }
                    else if(lines[i][j] === '1' && firsOneIndex > -1){
                        indexes.push(j - firsOneIndex)
                    }
                }
            }
            else {
                for (let j = 0; j < lines[i].length; j++) {
                    if (lines[i][j] === '1') {
                        indexes.push(8*i + j - firsOneIndex)
                    }
                }
            }

        }
        return indexes


    }


}
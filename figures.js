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
    }

    renderFigure(code) {
        let startX = 0
        let startY = 0
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
                startX = 0
            }
            else if (code[i] === '0') {
                startX += this.cubeSize + 2
            }
        }

        return container
    }

    disable(figure) {
        // this.#setColor(figure.figure,constant._DISABLED_CUBE_COLOR)
    }

    clear(figure) {
        // this.#setColor(figure,constant._EMPTY_CUBE_COLOR)
    }

    full(figure) {
        // this.#setColor(figure,constant._FULL_CUBE_COLOR)
    }

}
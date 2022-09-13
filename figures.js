import Cube from "./cube.js"
import constant from "./constants.js"
export default class Figure {
    constructor(pattern) {
        this.Figures = this.renderFigures(pattern)
        this.draggable = false
        this.offsetX = 0
        this.offsetY = 0
    }

    renderFigures(figures) {
        let array = []
        for (let figure of figures) {
            let startX = 0
            let startY = 0
            let container = document.createElement("div")
            container.style.position = 'relative'
            for (let i = 0; i < figure.length; i++) {
                if (figure[i] === '1') {
                    let cube = new Cube(startX, startY, 20, 20, "#995D5D").element
                    cube.style.position = "absolute"
                    cube.style.borderRadius = "4px "
                    cube.style.border = "1px solid black"
                    container.append(cube)
                    startX += 22
                }
                else if (figure[i] === 'n') {
                    startY += 22
                    startX = 0
                }
                else if (figure[i] === '0') {
                    startX += 22
                }
            }
            array.push(container)
        }
        return array
    }

    disable(figure){
        this.#setColor(figure,constant._DISABLED_CUBE_COLOR)
    }

    clear(figure) {
        this.#setColor(figure,constant._EMPTY_CUBE_COLOR)
    }
    
    full(figure){
        this.#setColor(figure,constant._FULL_CUBE_COLOR)
    }

    #setColor(figure,color){
        let cubes = figure.childNodes
        for(let cube of cubes){
            cube.style.backgroundColor = color
        }
    }

}
import constant from "./constants.js"
export default class Cube {
    constructor(x, y, w = constant._CUBE_WIDTH, h = constant._CUBE_HEIGHT, color = constant._EMPTY_CUBE_COLOR) {
        this.width = w
        this.height = h
        this.color = color
        this.isEmpty = true
        this.x = x
        this.y = y
        this.disabled = false
        this.element = this.getCube()
    }
    getCube() {
        let cube = document.createElement("div")
        cube.style.width = `${this.width}px`
        cube.style.height = `${this.height}px`
        cube.style.top = `${this.y}px`
        cube.style.left = `${this.x}px`
        cube.style.backgroundColor = this.color
        return cube
    }
}


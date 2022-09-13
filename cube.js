import Constant from "./constants.js"
export default class Cube {
    constructor(x, y, w = Constant._CUBE_WIDTH, h = Constant._CUBE_HEIGHT, color = Constant._EMPTY_CUBE_COLOR) {
        this.width = w
        this.height = h
        this.color = color
        this.isEmpty = true
        this.x = x
        this.y = y
        this.disabled = false
        this.element = getCube(this.x, this.y, this.width, this.height, this.color)
    }
}
function getCube(x, y, w, h, color) {
    let cube = document.createElement("div")
    cube.style.width = `${w}px`
    cube.style.height = `${h}px`
    cube.style.top = `${y}px`
    cube.style.left = `${x}px`
    cube.style.backgroundColor = color
    return cube
}

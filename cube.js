import constant from "./constants.js"
import helpers from "./helpers.js"
import Renderer from "./renderer.js"
export default class Cube extends Renderer {
    constructor() {
        super()
        this.disabled = false
        this.element = this.getDefaultElement()
        this._isEmpty = true
    }
    getDefaultElement() {
        let cube = document.createElement("div")
        cube.style.width = `${constant._CUBE_WIDTH}px`
        cube.style.height = `${constant._CUBE_HEIGHT}px`
        cube.style.backgroundColor = constant._EMPTY_CUBE_COLOR
        return cube
    }

    get isEmpty() {
        return this._isEmpty
    }
    set isEmpty(value) {
        if(value){
            this.setBackgroundColor(constant._EMPTY_CUBE_COLOR)
        }
        else{
            this.setBackgroundColor(constant._FULL_CUBE_COLOR)

        }
        this._isEmpty = value
    }

}


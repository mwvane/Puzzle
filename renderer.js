import helpers from "./helpers.js"
export default class Renderer{
    constructor(element){
        this.element = element
    }
    get width() {
        if (this.element) {
            return helpers.pxToNumber(this.element.style.width)
        }
        return null
    }
    get height() {
        if (this.element) {
            return helpers.pxToNumber(this.element.style.height)
        }
        return null
    }
    get absoluteTop() {
        if (this.element) {
            return helpers.getOffset(this.element).top
        }
        return 0
    }
    get top() {
        if (this.element) {
            return helpers.pxToNumber(this.element.style.top)
        }
        return 0
    }
    get absoluteLeft() {
        if (this.element) {
            return helpers.getOffset(this.element).left
        }
        return 0
    }
    get absoluteRight() {
        if (this.element) {
            return helpers.getOffset(this.element).left + this.width
        }
        return 0
    }
    get left() {
        if (this.element) {
            return helpers.pxToNumber(this.element.style.left)
        }
        return 0
    }
    get absoluteBottom() {
        if (this.element) {
            return helpers.getOffset(this.element).top + this.height
        }
        return 0
    }
    
    get backgroundColor() {
        if (this.element) {
            return this.element.style.backgroundColor
        }
        return null
    }

    setTop(value) {
        if (this.element) {
            this.element.style.top = `${value}px`
        }
    }
    setLeft(value) {
        if (this.element) {
            this.element.style.left = `${value}px`
        }
    }
    setWidth(value) {
        if (this.element) {
            this.element.style.width = `${value}px`
        }
    }
    setHeight(value) {
        if (this.element) {
            this.element.style.height = `${value}px`
        }
    }
    setBackgroundColor(value) {
        if (this.element) {
            this.element.style.backgroundColor = value
        }
    }
    remove(){
        this.element.remove()
    }
}
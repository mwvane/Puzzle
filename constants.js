export default class Constant{
    constructor(){

    }
    static _CUBE_WIDTH = 60
    static _CUBE_HEIGHT = 60
    static _EMPTY_CUBE_COLOR = "#1E1E1E"
    static _FULL_CUBE_COLOR = "#92522E"
    static _DISABLED_CUBE_COLOR = "#8C6E78"

    static _FIGURES = [
        // n = new line, 1 = cube ,  0 = space
        `1`,`11`,`111`,`1111`,`1111`,
        `1n1`,`1n1n1`,`1n1n1n1n`,`1n1n1n1`,
        `11n11`,`111n010`,`10n11n10`,`01n11n01`,`111n111n111`,
        `010n111`,`10n11n01`,`01n11n10`,`100n100n111`,`111n100n100`,
        `111n001n001`, `001n001n111`,`01n11`,`11n10`
    ]
}
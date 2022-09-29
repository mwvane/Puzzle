
const MOBILE_EVENTS = {
    MOUSE_DOWN: "touchstart",
    MOUSE_UP: "touchend",
    MOUSE_MOVE: "touchmove",
}

const PC_EVENTS = {
    MOUSE_DOWN: "mousedown",
    MOUSE_UP: "mouseup",
    MOUSE_MOVE: "mousemove",
}

const IS_MOBILE = (function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
})()

const OBJ = {
    _CUBE_WIDTH: 60,
    _CUBE_HEIGHT: 60,
    _EMPTY_CUBE_COLOR: "#1E1E1E",
    _FULL_CUBE_COLOR: "#92522E",
    _DISABLED_CUBE_COLOR: "#8C6E78",
    _HILIGHT_COLOR: "#FCC629",

    _DEFAULT_FIGURE_COLOR: "#995D5D",

    _FIGURES: [
        // n = new line, 1 = cube ,  0 = space
        `1`, `11`, `111`, `1111`, `1111`,
        `1n1`, `1n1n1`, `1n1n1n1n`, `1n1n1n1`,
        `11n11`, `111n010`, `10n11n10`, `01n11n01`, `111n111n111`,
        `010n111`, `10n11n01`, `01n11n10`, `100n100n111`, `111n100n100`,
        `111n001n001`, `001n001n111`, `01n11`, `11n10`
    ],
    _TEST_FIGURE: "11n11",

    _MOBILE_EVENTS: MOBILE_EVENTS,
    _PC_EVENTS: PC_EVENTS,
    _IS_MOBILE: IS_MOBILE,

    _EVENTS: (function () {
        if (IS_MOBILE) {
            return MOBILE_EVENTS;
        }
        return PC_EVENTS
    })(),
}

export default OBJ
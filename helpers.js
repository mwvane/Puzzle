export default {

    pxToNumber(px) {
        return Number(px.slice(0, px.length - 2))
    },

    getRandomNUmber(start, end) {
        return Math.floor(Math.random() * end) + start;
    },

    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }
}
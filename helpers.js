export default {

    pxToNumber(px){
        return Number(px.slice(0,px.length - 2))
    },

    getRandomNUmber(start ,end){
        return Math.floor(Math.random() * end) + start;
    }
}
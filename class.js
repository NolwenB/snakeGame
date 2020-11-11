class col {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
class pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
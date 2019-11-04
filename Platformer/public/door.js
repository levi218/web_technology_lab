class Door {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
    }
    render(canvas, viewport) {
        let offset = { x: -viewport.x + viewport.width / 2, y: -viewport.y + viewport.height / 2 }
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#EEEE00";
        ctx.fillRect(this.x + offset.x, this.y + offset.y, CELL_SIZE, CELL_SIZE)
        if (this.jump_cd > 0) this.jump_cd -= DELTA_TIME / 1000;
        if (this.walljump_cd > 0) this.walljump_cd -= DELTA_TIME / 1000;
    }
    isCollided(character) {
        if (character.x < this.x + this.width && // right collision
            character.x + character.width > this.x &&  // left collision
            character.y < this.y + this.height && // bottom
            character.y + character.height > this.y) { // top
            // collision detected!
            return true;
        }
        return false;
    }
}
class Enemy {
    constructor(checkpoints) {
        this.x = checkpoints[0].x;
        this.y = checkpoints[0].y;
        this.width = CELL_SIZE / 2;
        this.height = CELL_SIZE / 2;
        this.checkpoints = checkpoints;
        this.curCheckpoint = 0;
    }
    update() {
        // check position, if close enough to checkpoint, move to next checkpoint
        if (distSqr(this.x, this.y, this.checkpoints[this.curCheckpoint].x, this.checkpoints[this.curCheckpoint].y) < CELL_SIZE * CELL_SIZE) {
            this.curCheckpoint += 1;
            if (this.curCheckpoint >= this.checkpoints.length) {
                this.curCheckpoint = this.curCheckpoint % this.checkpoints.length;
            }
        } else {
            this.x = lerp(this.x, this.checkpoints[this.curCheckpoint].x, 0.006);
            this.y = lerp(this.y, this.checkpoints[this.curCheckpoint].y, 0.006);
        }
    }
    render(canvas, viewport) {
        let offset = { x: -viewport.x + viewport.width / 2, y: -viewport.y + viewport.height / 2 }
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x + offset.x, this.y + offset.y, this.width, this.height)
    }
    isCollided(obj) {
        if (obj.x < this.x + this.width && // right collision
            obj.x + obj.width > this.x &&  // left collision
            obj.y < this.y + this.height && // bottom
            obj.y + obj.height > this.y) { // top
            // collision detected!
            return true;
        }
        return false;
    }
    tryAttack(character) {
        if (this.isCollided(character)) {
            let x_dif = character.x + character.width / 2 - this.x - this.width / 2;
            let y_dif = character.y + character.height / 2 - this.y - this.height / 2;
            let vx = (100 / x_dif);
            let vy = (100 / y_dif);
            if (vx > JUMP_SPEED * 7 || isNaN(vx) || !isFinite(vx)) vx = JUMP_SPEED * 7
            if (vy > JUMP_SPEED || isNaN(vy) || !isFinite(vy)) vy = JUMP_SPEED
            if (vx < -JUMP_SPEED * 7 || isNaN(vx) || !isFinite(vx)) vx = -JUMP_SPEED * 7
            if (vy < -JUMP_SPEED || isNaN(vy) || !isFinite(vy)) vy = -JUMP_SPEED
            character.applyVelocity(vx, vy)
            character.stunned(0.2);
        }
    }
}
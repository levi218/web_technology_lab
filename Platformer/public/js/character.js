class Character {
    constructor(x, y) {
        console.log("character created")
        this.x = x;
        this.y = y;
        this.width = CELL_SIZE * 0.8;
        this.height = CELL_SIZE * 0.8;
        this.vx = 0;
        this.vy = 0;
        this.acceleration = ACCELERATION;
        this.jumpSpeed = JUMP_SPEED;
        this.isOnAir = true;
        this.isWallMounted = null;
        this.walljump_cd = 0;
        this.jump_cd = 0
    }
    //render
    render(canvas, viewport) {
        let offset = { x: -viewport.x + viewport.width / 2, y: -viewport.y + viewport.height / 2 }
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ABCDDD";
        // ctx.fillRect(this.x + offset.x, this.y + offset.y, CELL_SIZE, CELL_SIZE)
        if (this.vx < 0) {
            this.last_dir = -1;
            ctx.drawImage(resources.getChar(), 0, 0, resources.getSize(), resources.getSize(), this.x + offset.x, this.y + offset.y, this.width, this.height)
        }
        else if (this.vx > 0) {
            this.last_dir = 1;
            ctx.drawImage(resources.getChar(), 1 * resources.getSize(), 0, resources.getSize(), resources.getSize(), this.x + offset.x, this.y + offset.y, this.width, this.height)
        } else {
            ctx.drawImage(resources.getChar(), (this.last_dir == 1 ? 1 : 0) * resources.getSize(), 0, resources.getSize(), resources.getSize(), this.x + offset.x, this.y + offset.y, this.width, this.height)

        }
        if (this.jump_cd > 0) this.jump_cd -= DELTA_TIME / 1000;
        if (this.walljump_cd > 0) this.walljump_cd -= DELTA_TIME / 1000;
        if (this.stun_duration > 0) this.stun_duration -= DELTA_TIME / 1000;

    }
    //collider with map
    isCollided(map, val) {
        let collisions = []
        map.forEachCell((rect) => {
            if (val && rect.value == val) {
                if (rect.x < this.x + this.width && // right collision
                    rect.x + rect.width > this.x &&  // left collision
                    rect.y < this.y + this.height && // bottom
                    rect.y + rect.height > this.y) { // top
                    // collision detected!
                    collisions.push(rect);
                }
            }
        })
        return collisions;
    }
    //apply force
    applyVelocity(vx, vy) {
        this.vx += vx;
        this.vy += vy;
        if (this.vx > 5 * MOVE_SPEED_CAP || !isFinite(this.vx)) this.vx = 5 * MOVE_SPEED_CAP
        if (this.vy > this.jumpSpeed || !isFinite(this.vy)) this.vy = this.jumpSpeed
        if (this.vx < 5 * MOVE_SPEED_CAP) this.vx = -5 * MOVE_SPEED_CAP
        if (this.vy < -this.jumpSpeed) this.vy = -this.jumpSpeed
        console.log(this.vx + "   " + this.vy)
    }
    stunned(duration) {
        this.stun_duration = duration;
    }
    //controlling
    moveHorizontal(dirX) {
        if (this.stun_duration > 0) return;
        let acceleration = dirX * this.acceleration * (this.isOnAir ? 0.15 : 1);
        if (this.isWallMounted) {
            if (((this.isWallMounted.dir == "LEFT" && acceleration > 0) || (this.isWallMounted.dir == "RIGHT" && acceleration < 0)) && this.walljump_cd <= 0) {
                this.isWallMounted = null
                return;
            }
        }
        this.vx += acceleration;

        this.vx = this.vx > MOVE_SPEED_CAP ? MOVE_SPEED_CAP : this.vx;
        this.vx = this.vx < -MOVE_SPEED_CAP ? -MOVE_SPEED_CAP : this.vx;
        // this.lastDir = dirX;
    }

    wallJump() {
        if (this.stun_duration > 0) return;
        if (this.isWallMounted != null && this.walljump_cd <= 0) {
            this.y -= 5;
            this.vy = -this.jumpSpeed
            this.isOnAir = true;
            this.walljump_cd = WALLJUMP_COOLDOWN;
            if (this.isWallMounted.dir == "LEFT") {
                this.vx = this.speed * 10
            } else {
                this.vx = -this.speed * 10
            }
            this.isWallMounted = null;
        }
    }
    jump() {
        if (this.stun_duration > 0) return;
        if (!this.isOnAir && this.jump_cd <= 0) {
            this.y -= 5;
            this.vy = -this.jumpSpeed
            this.isOnAir = true;
            this.jump_cd = JUMP_COOLDOWN
            this.walljump_cd = JUMP_COOLDOWN
            if (soundManager)
                soundManager.playJumpSound();
        } else if (this.isWallMounted) this.wallJump()
    }
}
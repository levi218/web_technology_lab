class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.initFirstLoad()
    }
    initFirstLoad() {
        this.physicsManager = new PhysicsManager();
        this.viewport = { x: 0, y: 0, width: 800, height: 600 }
        canvas.width = this.viewport.width;
        canvas.height = this.viewport.height
        this.current_level = 0;

    }
    initMap(mapFile) {
        // 1 - obstacle
        // 0 - free
        // 2 - player start point
        // 3 - door
        let decorative_arr = mapFile.map;
        let map_arr = []
        decorative_arr.forEach((row, i) => {
            let r = []
            row.forEach((cell, j) => {
                if (cell == -1) r.push(2);
                else if (cell == -2) r.push(3)
                else if (cell != 0) r.push(1)
                else r.push(0);
            })
            map_arr.push(r);
        })
        this.map = new Map(map_arr, decorative_arr);
        this.map.forEachCell((tile) => {
            if (tile.value == 3) {
                // summon door
                this.door = new Door(tile.x, tile.y);
            }
            if (tile.value == 2) {
                // summon player at start point
                this.character = new Character(tile.x, tile.y);
            }
        })
        this.isHolding = { left: false, up: false, right: false, down: false }
        this.gameover = false;

        this.enemies = []
        if (mapFile.enemies) {
            for (let enemyData of mapFile.enemies) {
                for (let cp of enemyData.checkpoints) {
                    let cell = this.map.getTileXY(cp.x, cp.y);
                    cp.x = cell.x+CELL_SIZE/2;
                    cp.y = cell.y+CELL_SIZE/2;
                }
                let enemy = new Enemy(enemyData.checkpoints)
                this.enemies.push(enemy);
            }
        }
    }
    update() {
        if (!this.gameover) {
            // apply physical stuffs
            this.physicsManager.apply(this.character, this.map);


            if (this.door.isCollided(this.character)) {
                this.gameover = true;
            }
            //move camera
            this.viewport.x = lerp(this.viewport.x, this.character.x + this.character.width / 2);
            this.viewport.y = lerp(this.viewport.y, this.character.y + this.character.height / 2);

            for (let enemy of this.enemies) {
                enemy.update();
                enemy.tryAttack(this.character);
            }
        }
    }
    render() {
        let ctx = canvas.getContext("2d");
        // render frame
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.border = "1px solid black";
        //render
        this.map.render(canvas, this.viewport);
        this.door.render(canvas, this.viewport);
        this.character.render(canvas, this.viewport);
        for (let enemy of this.enemies) {
            enemy.render(canvas, this.viewport);
        }

    }

    processInput() {
        if (!this.gameover) {
            if (this.isHolding.left) this.character.moveHorizontal(-1);
            if (this.isHolding.right) this.character.moveHorizontal(1);
            if (this.isHolding.up) this.character.jump();
        }
    }
    start() {
        var loading = fetch(maps[this.current_level])
            .then(response => response.json())
            .then(map => game.initMap(map))
            .then(() => {
                // save start time
                this.level_start_time = new Date();
                let current_high = localStorage.getItem("hs_"+this.current_level);
                if(current_high) document.getElementById("highscore").innerHTML = parseInt(current_high)/1000 + " s";
                else document.getElementById("highscore").innerHTML = "0 s";
                // game cycle
                this.game_cycle = setInterval(() => {
                    if (game.gameover) {
                        clearInterval(this.game_cycle);
                        if (this.current_level + 1 < maps.length) {
                            alert("Completed level " + (this.current_level + 1))
                            // save complete time to highscore
                            let completed_in = new Date() - this.level_start_time;
                            let current_high = localStorage.getItem("hs_"+this.current_level);
                            if(current_high == null){
                                localStorage.setItem("hs_"+this.current_level,completed_in);
                            }else if(parseInt(current_high)>completed_in){
                                localStorage.setItem("hs_"+this.current_level,completed_in);
                            }
                            // load next level
                            this.current_level++;
                            this.start();
                            return;
                        } else {
                            alert("You won!");
                        }
                    }
                    game.processInput()
                    game.update();
                    game.render();
                    // update UI
                    document.getElementById("score").innerHTML = (new Date()- this.level_start_time)/1000 + " s";
                }, DELTA_TIME);

            })
    }
}
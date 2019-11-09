class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.scoreManager = new ScoreManager();
        this.initFirstLoad()
    }
    initFirstLoad() {
        this.physicsManager = new PhysicsManager();
        this.viewport = { x: 400, y: 1000, width: 800, height: 600 }
        canvas.width = this.viewport.width;
        canvas.height = this.viewport.height
        this.current_level = 0;

    }
    initMap(map) {
        this.map = new Map(map)
        // summon door at door and character at spawn_point

        this.door = new Door(this.map.door);
        this.character = new Character(this.map.spawn_point.x, this.map.spawn_point.y);
        this.isHolding = { left: false, up: false, right: false, down: false }
        this.gameover = false;

        // spawn enemies and config path
        this.enemies = []
        if (this.map.enemies != null)
            for (let enemy_layer of this.map.enemies) {
                let enemy = new Enemy(enemy_layer)
                this.enemies.push(enemy);
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
            this.viewport.y = lerp(this.viewport.y, this.character.y + this.character.height / 2 - this.viewport.height * 1 / 5);

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
        if(this.current_level==0){
            this.drawTitle()
            this.drawScoreboard()
        }
        this.character.render(canvas, this.viewport);
        for (let enemy of this.enemies) {
            enemy.render(canvas, this.viewport);
        }
        
    }
    drawTitle(){
        let ctx = canvas.getContext("2d");
        let offset = { x: +this.viewport.x - this.viewport.width / 2, y: +this.viewport.y - this.viewport.height / 2 }
        ctx.textAlign = "center"
        ctx.font = 'bold 72px calibri';
        ctx.fillStyle = '#6BC298'
        ctx.fillText("DODGE AND JUMP",CELL_SIZE*18-offset.x,CELL_SIZE*9-offset.y);
        ctx.strokeText("DODGE AND JUMP",CELL_SIZE*18-offset.x,CELL_SIZE*9-offset.y);
        ctx.fillStyle = '#4A876A'
        ctx.font = 'bold 35px calibri';
        ctx.fillText("◀HIGH SCORE       -       START GAME▶",CELL_SIZE*18-offset.x,CELL_SIZE*11-offset.y)
    }
    drawScoreboard() {
        let ctx = canvas.getContext("2d");
        let offset = { x: +this.viewport.x - this.viewport.width / 2, y: +this.viewport.y - this.viewport.height / 2 }
        ctx.strokeRect(CELL_SIZE*2-offset.x,CELL_SIZE*2-offset.y,CELL_SIZE*5, CELL_SIZE*9);
        ctx.fillStyle = '#FFF099'
        ctx.fillRect(CELL_SIZE*2-offset.x,CELL_SIZE*2-offset.y,CELL_SIZE*5, CELL_SIZE*9);
        ctx.fillStyle = '#8A6C4C'
        ctx.textAlign = "center"
        ctx.font = 'bold 27px calibri';
        ctx.fillText("HIGHSCORE",CELL_SIZE*4.5-offset.x,CELL_SIZE*3-offset.y);

        let i = 0;
        ctx.font = 'normal 22px calibri';
        for(let entry of this.scoreManager.highscoreBoard){
            ctx.textAlign = 'left'
            ctx.fillText((i+1)+". "+entry.name,CELL_SIZE*2.5-offset.x,CELL_SIZE*(i+4)-offset.y);  
            ctx.textAlign = 'right'
            ctx.fillText(parseFloat(entry.score).toFixed(1)+" s",CELL_SIZE*6.5-offset.x,CELL_SIZE*(i+4)-offset.y);  
              
            i++;
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
        var maps = ["map0.json", "map2.json", "map1.json"]
        var loading = fetch(maps[this.current_level])
            .then(response => response.json())
            .then(map => game.initMap(map))
            .then(() => {
                // save start time
                if(this.current_level==1)
                    this._start_time = new Date();
                // game cycle
                this.game_cycle = setInterval(() => {
                    if (game.gameover) {
                        clearInterval(this.game_cycle);
                        if (this.current_level + 1 < maps.length) {
                            if(this.current_level!=0)
                                alert("Level " + (this.current_level )+" completed!")
                            // load next level
                            this.current_level++;
                            this.start();
                            return;
                        } else {
                            let total_time = (new Date()-this._start_time)/1000;
                            let name = prompt("You won! Enter your name:");
                            this.scoreManager.registerScore(name,total_time);
                            this.current_level=0;
                            this.start();
                            return;
                        }
                    }
                    game.processInput()
                    game.update();
                    game.render();
                    // update UI
                    // document.getElementById("score").innerHTML = (new Date()- this.level_start_time)/1000 + " s";
                }, DELTA_TIME);
            });
    }

}
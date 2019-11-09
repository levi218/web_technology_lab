var tileManager = {
    tilesets: []
}
class Map {

    constructor(mapJson) {
        this.mapData = mapJson;
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.cellSize = { x: this.mapData.tilewidth, y: this.mapData.tileheight };
        tileManager.tilesets = []
        for (var i = 0; i < this.mapData.tilesets.length; i++) {
            tileManager.tilesets.push(new TileSet(this.mapData.tilesets[i]))
        }
        this.background = this.mapData.layers.find(l => l.name == "background");
        if (this.background) {
            let bg = new Image()
            bg.onload = () => { this.bg_loaded = true }
            bg.src = this.background.image;
            this.background = bg;
        }
        this.obstacle = this.mapData.layers.find(l => l.name == "obstacle");
        this.enemies = this.mapData.layers.find(l => l.name == "enemies").layers
        let pins = this.mapData.layers.find(l => l.name == "pins")
        this.spawn_point = pins.objects.find(o => o.name == "spawn_point")
        this.door = pins.objects.find(o => o.name == "door")
        this.calibPositions()
        this.door = new Door(this.door)
        this.initMapArray();
    }

    calibPositions() {
        this.door.x = this.door.x / this.cellSize.x * CELL_SIZE;
        this.door.y = this.door.y / this.cellSize.y * CELL_SIZE - CELL_SIZE;

        this.spawn_point.x = this.spawn_point.x / this.cellSize.x * CELL_SIZE - CELL_SIZE / 2;
        this.spawn_point.y = this.spawn_point.y / this.cellSize.y * CELL_SIZE - CELL_SIZE / 2;

    }
    initMapArray() {
        let map = []
        let deco = []
        for (let i = 0; i < this.obstacle.height; i++) {
            let row_logic = []
            let row_deco = []
            for (let j = 0; j < this.obstacle.width; j++) {
                let val = this.obstacle.data[i * this.obstacle.width + j] - 1;
                if (val == -1) {
                    row_logic.push(0);
                    row_deco.push(-1);
                } else {
                    row_logic.push(1);
                    row_deco.push(val)
                }
            }
            map.push(row_logic);
            deco.push(row_deco)
        }
        this.map = map;
        this.deco = deco;
        console.log(this.obstacle);
        console.log(this.deco)
    }

    // constructor(map, deco) {
    //     this.map = map;
    //     this.deco = deco;
    // }
    render(canvas, viewport) {
        if (!viewport) viewport = { x: 500, y: 500, width: 1000, height: 1000 }
        let offset = { x: +viewport.x - viewport.width / 2, y: +viewport.y - viewport.height / 2 }
        let ctx = canvas.getContext("2d");
        if (this.bg_loaded) {
            let width = this.background.width;
            let height = this.background.height;
            ctx.drawImage(this.background, 0, 0, width, height,
                -width+viewport.width+0.1*viewport.x, -height+viewport.height+0.1*viewport.y, width, height)
        }
        this.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell == 1) {
                    //ctx.fillStyle = "#DDDDDD"
                    //ctx.fillRect(j * CELL_SIZE - offset.x, i * CELL_SIZE - offset.y, CELL_SIZE, CELL_SIZE)
                    //let tile = this.tilesets[0].getTileById(this.deco[i][j]);
                    let destX = j * CELL_SIZE - offset.x;
                    let destY = i * CELL_SIZE - offset.y;
                    tileManager.tilesets[0].draw(canvas, this.deco[i][j], destX, destY)
                }
            })
        })

    }
    getTileXY(x, y) {
        return {
            x: x * CELL_SIZE,
            y: y * CELL_SIZE,
            index_x: x,
            index_y: y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            value: this.map[y][x]
        };
    }
    forEachCell(cb) {
        this.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                cb(this.getTileXY(j, i));
            })
        })
    }
}
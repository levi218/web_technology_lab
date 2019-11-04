class Map {
    constructor(map, deco) {
        this.map = map;
        this.deco = deco;
    }
    render(canvas, viewport) {
        if (!viewport) viewport = { x: 0, y: 0, width: 1000, height: 1000 }
        let offset = { x: +viewport.x - viewport.width / 2, y: +viewport.y - viewport.height / 2 }
        let ctx = canvas.getContext("2d");
        this.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell == 1) {
                    ctx.fillStyle = "#DDDDDD"
                    //ctx.fillRect(j * CELL_SIZE - offset.x, i * CELL_SIZE - offset.y, CELL_SIZE, CELL_SIZE)
                    ctx.drawImage(resources.getTile(), resources.getSize() * (this.deco[i][j] - 1), 0, resources.getSize(), resources.getSize(), j * CELL_SIZE - offset.x, i * CELL_SIZE - offset.y, CELL_SIZE, CELL_SIZE)
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
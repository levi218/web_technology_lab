class Resources {
    constructor() {
        this.tiles = new Image();
        this.tiles.src = "tiles.png"

        this.character = new Image();
        this.character.src = "character.png"

        this.jumpSound = new Audio('jump.wav')
    }
    getTile() {
        //while (!this.tiles_ready);
        return this.tiles;
    }
    getChar() {
        //while (!this.character_ready);
        return this.character;
    }

    getJumpSound(){
        return this.jumpSound
    }
    getSize() {
        return 64;
    }
}
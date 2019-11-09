class Resources {
    constructor() {

        this.character = new Image();
        this.character.src = "images/character.png"

        this.jumpSound = new Audio('jump.wav')
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
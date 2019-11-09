class ScoreManager {
    constructor() {
        if (localStorage.getItem("highscoreBoard") == null) {
            this.highscoreBoard = []
        } else {
            this.highscoreBoard = JSON.parse(localStorage.getItem("highscoreBoard"))
        }
    }
    registerScore(name, score) {
        this.highscoreBoard.push({ name: name, score: score });
        this.highscoreBoard.sort((a, b) => { return parseFloat(a.score) - parseFloat(b.score) });
        this.highscoreBoard = this.highscoreBoard.slice(0,5);
        localStorage.setItem("highscoreBoard", JSON.stringify(this.highscoreBoard));
    }
}
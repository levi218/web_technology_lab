const cellSize = 40;
const rows = 16;
const cols = 10;
const colors = ["#eb7070", "#fec771","#e6e56c","#64e291","#4f81c7","#64c4ed","#a72693"];
const blockTypes = [
	[new Coordinate(-1,0), new Coordinate(0,0), new Coordinate(1,0), new Coordinate(2,0)], // line
	[new Coordinate(0,0), new Coordinate(1,0), new Coordinate(0,-1), new Coordinate(1,-1)], //square
	[new Coordinate(-1,-1), new Coordinate(0,0), new Coordinate(1,0), new Coordinate(-1,0)], //L
	[new Coordinate(1,-1), new Coordinate(0,0), new Coordinate(1,0), new Coordinate(-1,0)], //L-2
	[new Coordinate(-1,0), new Coordinate(0,0), new Coordinate(0,-1), new Coordinate(1,-1)], //Z
	[new Coordinate(1,0), new Coordinate(0,0), new Coordinate(0,-1), new Coordinate(-1,-1)], //Z-2
	[new Coordinate(0,0), new Coordinate(-1,0), new Coordinate(1,0), new Coordinate(0,-1)], //T
];

const sounds = {
	clear : new Audio('sounds/clear.wav'),
	fall : new Audio('sounds/fall.wav'),
	line : new Audio('sounds/line.wav'),
	levelUp : new Audio('sounds/levelUp.wav')
}

class Tetris{

	constructor(mainCanvas, secondaryCanvas, scoreboard,levelBoard){
		this.mainCanvas = mainCanvas;
		this.secondaryCanvas = secondaryCanvas;
		this.scoreboard = scoreboard;
		this.levelBoard = levelBoard;
		this.soundEnabled = true;
		//set canvases' sizes
		this.mainCanvas.width = cols*cellSize;
		this.mainCanvas.height = rows*cellSize;
		this.secondaryCanvas.width = 4*cellSize;
		this.secondaryCanvas.height = 2*cellSize;

		const that = this;
		this.gameLoop = function (){
			that.nextFrame();
			var delay = 700-that.level*75;
			delay = delay<300?300:delay;
			setTimeout(that.gameLoop,delay);
		}

		this.init();
	}

	init(){
		this.isGameOver = false;
		this.isGameStarted = false;
		this.isPaused = false;
		
		this.nextBlock = null;
		this.currentBlock = null;

		this.score = 0;
		this.updateScoreboard();

		//initiate arrField array
		this.arrField = [];
		for(var i = 0;i<rows;i++){
			var row = [];
			for(var j =0;j<cols;j++){
				row.push(-1);
			}
			this.arrField.push(row);
		}
		this.draw();
	}

	togglePaused(){
		this.isPaused = !this.isPaused;
		this.draw();
	}

	setSoundEnabled(status){
		this.soundEnabled = status;
	}
	updateScoreboard(){
		if(this.scoreboard && this.scoreboard!=null) this.scoreboard.textContent = this.score;
		if(this.levelBoard && this.levelBoard!=null) this.levelBoard.textContent = this.level;	
	}

	get level(){ 
		return Math.floor(this.score/7)+1;
	}

	nextFrame(){
		if(!this.isGameOver && this.isGameStarted && !this.isPaused){
			if(this.currentBlock.canMove(this.arrField, DIR.DOWN)) {
				this.currentBlock.move(DIR.DOWN);
			}
			else{
				if(this.soundEnabled) sounds.fall.play();
				this.currentBlock.applyOn(this.arrField);
				if(this.isRowEmpty(0)){
					this.generateNewBlock();
					var cleared = this.clearRowsFull();
					this.score+=cleared;

					if(this.soundEnabled){
						if(cleared==4){
							sounds.clear.play();
						}else if(cleared>0){
							sounds.line.play();
						}
						if(this.score%7==0&& this.score!=0 && cleared!=0){
							sounds.levelUp.play();
						}
					}
					this.updateScoreboard();
				}
				else{
					//Game Over
					this.isGameOver = true;
					this.currentBlock = null;
					var records = localStorage["tetris.records"];
					if(!records||records==null){
						records = "[]";
					}
					records  = JSON.parse(records);
					var that = this;
					records.push({name : localStorage["tetris.username"], score: that.score});
					records.sort(function (a,b){
						if(a.score<b.score) return 1;
						if(a.score>b.score) return -1;
						return 0;
					});
					localStorage["tetris.records"] = JSON.stringify(records);
					//window.location.href="record.html";
				}
			}
		}
		this.draw();
	}
	

	keyboardHandler(keyName){
		if(!this.isGameStarted){
			// press any key to start the game;
			this.generateNewBlock();
			this.isGameStarted = true;
		}else{
			if(!this.isGameOver){
				if(keyName == 'ArrowUp'){
					// rotate
					this.currentBlock.rotate(this.arrField);
					this.draw();
				}else{
					var direction= DIR.DOWN;
					switch(keyName){
						case  'ArrowDown':
							direction = DIR.DOWN;
							break;
						case  'ArrowLeft':
							direction = DIR.LEFT;
							break;
						case  'ArrowRight':
							direction = DIR.RIGHT;
							break;
						default:
							return;
					}
					if(this.currentBlock.canMove(this.arrField, direction)){
						this.currentBlock.move(direction);
						this.draw();
					}
				}
			}
		}
	}

	isRowEmpty(rowIndex){
		// if there's a block filled in first row then call gameOver
		for(var i = 0; i<cols;i++){
			if(this.arrField[rowIndex][i]!=-1) return false;
		}
		return true;
	}

	isRowFull(rowIndex){
		//check if row's full
		for(var i = 0; i<cols;i++){
			if(this.arrField[rowIndex][i]==-1) return false;
		}
		return true;				
	}
	
	clearRow(rowIndex){
		var row = this.arrField.splice(rowIndex,1);
		for(var i = 0; i<cols;i++) {
			row[i] = -1;
		}
		this.arrField.unshift(row);
	}

	draw(){
		// draw next block on the side
		if(this.secondaryCanvas.getContext){
			let ctx = this.secondaryCanvas.getContext('2d');
			ctx.clearRect(0,0,cellSize*4,cellSize*3);
			if(this.nextBlock && this.nextBlock!=null && this.isGameStarted)
				this.nextBlock.draw(ctx);
		}

		//if game not yet started, draw a message
		if(!this.isGameStarted){
			let ctx = this.mainCanvas.getContext('2d');
			//clear canvas
			ctx.clearRect(0,0,cellSize*cols,cellSize*rows);
			ctx.fillStyle = "#444";
			ctx.fillRect(0,0,cellSize*cols,cellSize*rows);
			ctx.fillStyle = "#EEE";
			ctx.textAlign = 'center';
			ctx.font = '30pt Calibri';
			ctx.fillText("Press any key to start!",cellSize*cols/2, cellSize*rows/2);
		}
		else
		// draw the play ground
		if(this.mainCanvas.getContext){
			let ctx = this.mainCanvas.getContext('2d');
			//clear canvas
			ctx.clearRect(0,0,cellSize*cols,cellSize*rows);
			ctx.lineWidth = 0.5;
			
			for(var i = 0;i<rows;i++){
				for(var j =0;j<cols;j++){
					if(this.arrField[i][j]==-1){
						ctx.fillStyle = "#EEE";
					}else{
						ctx.fillStyle = colors[this.arrField[i][j]]
					}
					ctx.fillRect(cellSize*j,cellSize*i,cellSize,cellSize);
					ctx.strokeRect(cellSize*j,cellSize*i,cellSize,cellSize);
				}
			}

			// draw the current block
			if(this.currentBlock)
				this.currentBlock.draw(ctx);

			// draw an overlay with message if gameovered
			if(this.isGameOver){
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				ctx.fillRect(0,0,cellSize*cols,cellSize*rows);
				ctx.fillStyle = "#EEE";
				ctx.textAlign = 'center';
				ctx.font = '50pt Calibri';
				ctx.fillText("Game Over!",cellSize*cols/2, cellSize*rows/2);
			}
			else
			//draw an overlay with message if paused
			if(this.isPaused){
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				ctx.fillRect(0,0,cellSize*cols,cellSize*rows);
				ctx.fillStyle = "#EEE";
				ctx.textAlign = 'center';
				ctx.font = '50pt Calibri';
				ctx.fillText("Paused",cellSize*cols/2, cellSize*rows/2);
			}

		}
	}

	generateNewBlock(){
		var typeId = Math.floor(Math.random() * 7);
		if(!this.nextBlock || this.nextBlock==null) 
			this.currentBlock = new Brick(cols/2-1,0,blockTypes[typeId], typeId);
		else{
			this.currentBlock = this.nextBlock;
			this.currentBlock.x = cols/2-1;
			this.currentBlock.y = 0;
		}
		this.nextBlock = new Brick(1,1,blockTypes[typeId], typeId);
	}
	
	clearRowsFull(){
		var numberOfRows = 0;
		for (var i = 0; i < rows; i++) {
			if(this.isRowFull(i)) {
				this.clearRow(i);
				numberOfRows+=1;
			}
		}
		return numberOfRows;
	}
}
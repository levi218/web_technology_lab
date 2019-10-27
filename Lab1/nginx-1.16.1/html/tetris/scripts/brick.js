class Brick{
	constructor(x,y, cells, color){
		this.x = x;
		this.y = y;
		this.cells = JSON.parse(JSON.stringify(cells));
		this.color = color;
	}

	isOverlap(arrField){
		for(const cell of this.cells){
			var x = cell.x+this.x;
			var y = cell.y+this.y;
			if(y>=rows || x>=cols || x<0) {
				return true;
			}else
			if(y>=0 && arrField[y][x]!=-1) return true;
		}
		return false;
	}

	rotate(arrField){
		//rotate
		var original = JSON.parse(JSON.stringify(this.cells));
		for(var cell of this.cells){
			var t = cell.x;
			cell.x = -cell.y;
			cell.y = t;
		}
		if(this.isOverlap(arrField))
			this.cells = original;
	}

	canMove(arrField, dir){
		//var original = JSON.parse(JSON.stringify(this.cells));
		var xOrigin = this.x;
		var yOrigin = this.y;
		this.x+=dir.x;
		this.y+=dir.y;
		var result = !this.isOverlap(arrField)
		this.x = xOrigin;
		this.y = yOrigin;
		return result;
	}

	move(dir){
		// move up or down depends on direction
		this.x+=dir.x;
		this.y+=dir.y;
	}
	draw(ctx){
		// draw this block
		ctx.fillStyle = colors[this.color];
		for(const cell of this.cells){
			ctx.fillRect(cellSize*(this.x+cell.x),cellSize*(this.y+cell.y),cellSize,cellSize);
		}
	}
	applyOn(arrField){
		// actually change the values in the array (that is, this block reach the bottom and stopped)
		for(const cell of this.cells){
			var x = cell.x+this.x;
			var y = cell.y+this.y;
			if(y>=0 && x>=0 && y<rows && x<cols)
				arrField[y][x] = this.color;
		}
	}
}
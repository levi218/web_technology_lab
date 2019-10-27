class Coordinate{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

class DIR {
	static get UP(){ return new Coordinate(0,-1);}
	static get DOWN(){ return new Coordinate(0,1);}
	static get LEFT(){ return new Coordinate(-1,0);}
	static get RIGHT(){ return new Coordinate(1,0);}
}
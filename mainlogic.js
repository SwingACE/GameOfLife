var sizeOfGrid = 5;

//游戏逻辑类
var Grid = {
	grid:0,
	newGrid:0,
	deltaRow:[-1,-1,-1,0,0,1,1,1],
	deltaColumn:[-1,0,1,-1,1,-1,0,1],

	//初始化Grid
	initGrid:function(){
		this.grid = [];
		this.newGrid = [];
		for (var i = 0; i < sizeOfGrid; i++){
			this.grid[i] = [];
			this.newGrid[i] = [];
			for (var j = 0; j < sizeOfGrid; j++){
				this.grid[i][j] = 0;
				this.newGrid[i][j] = 0;
			}
		}
	},

	//计算下一时刻所有的细胞状态
	decideCellState:function(){
		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				this.newGrid[i][j] = (this.isAlive(i, j) == true);
			}
		}
	},

	//判断一个细胞下一时刻是否存活
	isAlive:function(i, j){
		var numOfNeighborAliveCell = 0;
		for (var k = 0; k < 8; k++) {
			var _i = (i + this.deltaRow[k] + sizeOfGrid) % sizeOfGrid;
			var _j = (j + this.deltaColumn[k] + sizeOfGrid) % sizeOfGrid;
			if (this.grid[_i][_j] == 1) {
				numOfNeighborAliveCell++;
			}
		}
		return (numOfNeighborAliveCell == 3 || (numOfNeighborAliveCell == 2 && this.grid[i][j] == 1));
	},

	//更新下一时刻的游戏界面
	updateGrid:function(){
		this.decideCellState();
		
		if (this.survive()){
			alert("Congratulation!");
			clearInterval(timer);
			return;
		}

		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				this.grid[i][j] = this.newGrid[i][j];
			}
		}

		paintGrid();

		if (this.gameOver()){
			alert("gameOver");
			Reset();
		}
	},

	//判断所有细胞是否死亡
	gameOver:function(){
		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				if (this.grid[i][j] == 1){
					return false;
				}
			}
		}
		return true;
	},

	//判断游戏中所有存活细胞的状态是否不再改变
	survive:function(){
		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				if (this.grid[i][j] != this.newGrid[i][j]){
					return false;
				}
			}
		}
		return true;
	}
};

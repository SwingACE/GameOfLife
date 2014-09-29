var sizeOfGrid = 5;
//游戏逻辑类
var Grid = {
	grid:0,
	newGrid:0,
	deltaRow:[-1,-1,-1,0,0,1,1,1],
	deltaColumn:[-1,0,1,-1,1,-1,0,1],
	//初始化Grid
	initGrid:function(){
		this.grid = new Array();
		this.newGrid = new Array();
		for (var i = 0; i < sizeOfGrid; i++){
			this.grid[i] = new Array();
			this.newGrid[i] = new Array();
			for (var j = 0; j < sizeOfGrid; j++){
				this.grid[i][j] = 0;
				this.newGrid[i][j] = 0;
			}
		}
		return;
	},
	//计算下一时刻所有的细胞状态
	decideCellState:function(){
		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				if (this.isAlive(i,j)){
					this.newGrid[i][j] = 1;
				}
				else{
					this.newGrid[i][j] = 0;
				}
			}
		}
		return;
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
		if (numOfNeighborAliveCell == 3){
			return true; 
		} 
		else if (numOfNeighborAliveCell == 2){
			return (this.grid[i][j] == 1);
		} 
		else{
			return false;
		}
	},
	//更新下一时刻的游戏界面
	updateGrid:function(){
		this.decideCellState();
		if (this.survive()){
			alert("Congratulation!");
			Reset();
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
			return;
		}
		return;
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
//用户预置细胞状态
function presetGrid (e){
	if (authorityOfOperationOnGrid){
		var rect = canv.getBoundingClientRect(); 
		var i = Math.floor((e.clientY - rect.top * (canv.height / rect.height))/sizeOfCell);
		var j = Math.floor((e.clientX - rect.left * (canv.width / rect.width))/sizeOfCell);
		if(i>=sizeOfGrid || j>=sizeOfGrid){
			return;
		}
		if (Grid.grid[i][j] == 1){
			Grid.grid[i][j] = 0;
		}
		else{
			Grid.grid[i][j] = 1;
		}
		paintGrid();
	}
	return;
}
//系统自动生成细胞初始状态
function randomGenerate(){
	if (authorityOfOperationOnGrid){
		for (var i = 0; i < sizeOfGrid; i++){
			for (var j = 0; j < sizeOfGrid; j++){
				Grid.grid[i][j] = Math.floor(Math.random()*2);
			}
		}
		paintGrid();
	}
	return;
}
//包装Grid.updateGrid()以便setInterval()调用
function update(){
	Grid.updateGrid();
}
//开始游戏
function Start (){
	if(authorityOfOperationOnGrid){
		authorityOfOperationOnGrid = false;
		isStart = true;
		timer = setInterval(update,1000);
	}
	return;
}
//暂停游戏
function Stop (){
	if(isStart&&!isStop){
		clearInterval(timer);
		isStop = true;
		return;
	}
}
//重置游戏
function Reset (){
	clearInterval(timer);
	authorityOfOperationOnGrid = true;
	isStart = false;
	isStop = false;
	Grid.initGrid();
	drawGrid();
	paintGrid();
	return;
}
//继续游戏
function Continue (){
	if(isStop){
		timer = setInterval(update,1000);
		return;
	}
}

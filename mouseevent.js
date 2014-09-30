//用户预置细胞状态
function presetGrid (e){
	if (authorityOfOperationOnGrid){
		var rect = canv.getBoundingClientRect(); 
		var i = Math.floor((e.clientY - rect.top * (canv.height / rect.height))/sizeOfCell);
		var j = Math.floor((e.clientX - rect.left * (canv.width / rect.width))/sizeOfCell);
		if(i < sizeOfGrid && j < sizeOfGrid){
			Grid.grid[i][j] = 1 - Grid.grid[i][j];
			paintGrid();
		}
	}
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
}

//暂停游戏
function Stop (){
	if(isStart && !isStop){
		clearInterval(timer);
		isStop = true;
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
}

//继续游戏
function Continue (){
	if(isStop){
		timer = setInterval(update,1000);
	}
}

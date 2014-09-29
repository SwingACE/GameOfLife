//绘制网格中的线条
function drawGrid (){
	var edge = sizeOfCell*sizeOfGrid;
	var sh = edge.toString();
	//var canvas = document.getElementById("map");
	//canvas.setAttribute("height",sh);
	//canvas.setAttribute("width",sh);
	map.lineWidth = 2;
    map.beginPath();
	for (var i = 0; i < sizeOfGrid; i++){
		map.moveTo(0,i*sizeOfCell);
		map.lineTo(edge,i*sizeOfCell);
	}
	map.moveTo(0,edge);
	map.lineTo(edge,edge);
	for (var i = 0; i < sizeOfGrid; i++){
		map.moveTo(i*sizeOfCell,0);
		map.lineTo(i*sizeOfCell,edge);
	}
	map.moveTo(edge,0);
	map.lineTo(edge,edge);
	map.closePath();
	map.stroke();
}
//根据细胞状态给网格上色
function paintGrid (){
	for (var i = 0; i < sizeOfGrid; i++){
		for (var j = 0; j < sizeOfGrid; j++){
			if (Grid.grid[i][j] == 1){
				map.fillStyle = "#000000";
			}
			else{
				map.fillStyle = "#C0C0C0";
			}
			map.fillRect(j*sizeOfCell+2,i*sizeOfCell+2,sizeOfCell-4,sizeOfCell-4);
		}
	}
}
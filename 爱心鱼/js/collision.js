//大鱼与果实的碰撞检测
function momFruitsCollision(){
	if(!data.gameOver){
		for (var i=0;i<fruit.num;i++) {
			if(fruit.alive[i]){
				//计算大鱼与果实之间的距离
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				//如果小于900
				if(l<900){
					//果实消失
					fruit.dead(i);
					//分数变化
					data.fruitNum++;
					//大鱼身体变化
					mom.momBodyCount++;
					//当身体达到最终态时保持最终态
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){
						data.double=2;
					}
					//产生涟漪
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}

}
//大鱼与小鱼的碰撞检测
function momBabyCollision(){
	if(!data.gameOver){
		//如果大鱼吃了果实
		if(data.fruitNum>0){
			//计算距离
			var l=calLength2(mom.x,mom.y,baby.x,baby.y);
			//如果小于900
			if(l<900){
				//小鱼身体变化
				baby.babyBodyCount=0;
				//大鱼身体变化
				mom.momBodyCount=0;
				//分数增加
				data.addScore();
				//涟漪产生
				halo.born(baby.x,baby.y);
			}
		}
	}


}

//分数的构造函数
function dataObj(){
	//黄色水果数量
	this.fruitNum=0;
	//蓝色水果数量
	this.double=1;
	//分数
	this.score=0;
	//游戏是否结束
	this.gameOver=false;
	//透明度
	this.alpha=0
}
//绘制
dataObj.prototype.draw=function(){
	//绘制
	var w=can1.width;
	var h=can1.height;
	ctx1.save();
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	ctx1.fillStyle="white";
	ctx1.fillText("SCORE:"+this.score,w*0.5,h-50);
	//如果游戏结束，绘制GAMEOVER
	if(data.gameOver){
		this.alpha+=deltaTime*0.0002;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	ctx1.restore();
}
//分数的计算函数
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}

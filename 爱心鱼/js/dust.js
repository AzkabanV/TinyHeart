//灰尘的构造函数
function dustObj(){
	//灰尘的位置
	this.x=[];
	this.y=[];
	//灰尘的振幅
	this.amp=[];
	//使用哪一种灰尘
	this.NO=[];
	//灰尘运动的正弦角
	this.alpha;
}
//灰尘的数量
dustObj.prototype.num=30;
//灰尘的初始化函数
dustObj.prototype.init=function(){
	for (var i=0;i<this.num;i++) {
		//每个灰尘的位置
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		//每个灰尘的振幅
		this.amp[i]=20+Math.random()*15;
		//每个灰尘的样子
		this.NO[i]=Math.floor(Math.random()*7);
	}
	//正弦角初始化
	this.alpha=0;
}
//灰尘的绘制函数
dustObj.prototype.draw=function(){
	//正弦角随着每一帧变化
	this.alpha+=deltaTime*0.0008;
	//正弦值
	var l=Math.sin(this.alpha);
	//绘制每一个灰尘
	for (var i=0;i<this.num;i++) {
		var no=this.NO[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
	}
}

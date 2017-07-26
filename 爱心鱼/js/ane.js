//海藻的构造函数
function aneObj(){
	//海藻的控制点
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	//海藻的振幅
	this.amp=[];
	//海藻的运动的正弦角
	this.alpha=0;
}
//海藻的数量
aneObj.prototype.num=50;
//海藻的初始化
aneObj.prototype.init=function(){
	for (var i=0;i<this.num;i++) {
		//海藻控制点的初始化
		this.rootx[i]=i*16+Math.random()*20;
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		//海藻的振幅初始化
		this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
	//正弦角随着每一帧变化
	this.alpha+=deltaTime*0.0008;
	//正弦值
	var l=Math.sin(this.alpha);
	//海藻的绘制
	ctx2.save();
	//海藻的透明度
	ctx2.globalAlpha=0.6;
	//宽度
	ctx2.lineWidth=20;
	//形状
	ctx2.lineCap="round";
	//颜色
	ctx2.strokeStyle="green";
	for (var i=0;i<this.num;i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		//控制点的位置
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		//二次贝塞尔曲线
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}

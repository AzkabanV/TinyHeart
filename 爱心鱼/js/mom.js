//大鱼的构造函数
function momObj(){
	//大鱼的位置
	this.x;
	this.y;
	//大鱼的角度
	this.angle;
	//大鱼尾巴的计数器
	this.momTailCount=0;
	//大鱼尾巴的计时器
	this.momTailTimer=0;
	//大鱼眼睛的计时器
	this.momEyeTimer=0;
	//大鱼眼睛的计数器
	this.momEyeCount=0;
	//大鱼眼睛眨动的时间间隔
	this.momEyeInterval=1000;
	this.momBodyCount=0;
}
//大鱼的初始化函数
momObj.prototype.init=function(){
	//大鱼位置初始化
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	//大鱼角度初始化
	this.angle=0;
}
//大鱼的绘制函数
momObj.prototype.draw=function(){
	//大鱼靠近鼠标
	this.x=lerpDistance(mx,this.x,0.98);
	this.y=lerpDistance(my,this.y,0.98);
	//大鱼应该旋转的角度
	var deltaX=mx-this.x;
	var deltaY=my-this.y;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);
	//大鱼尾巴计时器随时间增加
	this.momTailTimer+=deltaTime;
	//如果大于50，大鱼尾巴计数器变化，大鱼尾巴改变，计时器重置
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	//大鱼眼睛计时器随时间增加
	this.momEyeTimer+=deltaTime;
	//如果大于this.momEyeInterval，大鱼眼睛计数器变化，大鱼眼睛改变，计时器根据眼睛情况分别重置
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}
	//绘制
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	var momEyeCount=this.momEyeCount;
	var momBodyCount=this.momBodyCount;
	if(data.double==1){
		ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	ctx1.restore();
}

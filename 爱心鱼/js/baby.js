//小鱼的构造函数
function babyObj(){
	//位置
	this.x;
	this.y;
	//角度
	this.angle;
	//小鱼尾巴计时器
	this.babyTailTimer=0;
	//小鱼尾巴计数器
	this.babyTailCount=0;
	//小鱼眼睛计时器
	this.babyEyeTimer=0;
	//小鱼眼睛计数器
	this.babyEyeCount=0;
	//小鱼眼睛眨动的时间间隔
	this.babyEyeInterval=1000;
	//小鱼身体计时器
	this.babyBodyTimer=0;
	//小鱼身体计数器
	this.babyBodyCount=0;
}
//初始化
babyObj.prototype.init=function(){
	//位置初始化
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	//角度初始化
	this.angle=0;
}
babyObj.prototype.draw=function(){
	//小鱼靠近大鱼
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	//小鱼旋转角度
	var deltaX=mom.x-this.x;
	var deltaY=mom.y-this.y;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);
	//小鱼尾巴计时器随时间增加
	this.babyTailTimer+=deltaTime;
	//如果大于50，小鱼尾巴计数器变化，小鱼尾巴改变，计时器重置
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	//小鱼眼睛计时器随时间增加
	this.babyEyeTimer+=deltaTime;
	//如果大于this.babyEyeInterval，小鱼眼睛计数器变化，小鱼眼睛改变，计时器根据眼睛情况分别重置
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}
	//小鱼身体计时器随时间增加
	this.babyBodyTimer+=deltaTime;
	//如果大于300，小鱼身体计数器变化，小鱼身体改变，当达到最终形态后保持，计时器重置
	if(this.babyBodyTimer>300){
		this.babyBodyCount+=1;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			data.gameOver=true;
		}
		this.babyBodyTimer%=300;
	}
	//绘制
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var babyTailCount=this.babyTailCount;
	var babyEyeCount=this.babyEyeCount;
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);	
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);	
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);


	ctx1.restore();
}
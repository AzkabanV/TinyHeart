//涟漪二的构造函数
function haloObj(){
	//位置
	this.x=[];
	this.y=[];
	//是否存活
	this.alive=[];
	//半径
	this.r=[];
}
//数量
haloObj.prototype.num=10;
//初始化
haloObj.prototype.init=function(){
	for (var i=0;i<this.num;i++) {
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}
//涟漪二的绘制
haloObj.prototype.draw=function(){
	ctx1.save();
	//宽度
	ctx1.lineWidth=2;
	//阴影模糊级数
	ctx1.shadowBlur=10;
	//阴影颜色
	ctx1.shadowColor="rgba(200,100,0,1)";
	for (var i=0;i<this.num;i++) {
		if(this.alive[i]){
			//半径随时间增大
			this.r[i]+=deltaTime*0.06;
			//如果半径大于60，则消失
			if(this.r[i]>60){
				this.alive[i]=false;
				break;
			}
			//透明度和半径成反比
			var alpha=1-this.r[i]/60;
			//绘制
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
//涟漪二的产生函数
haloObj.prototype.born=function(x,y){
	for (var i=0;i<this.num;i++) {
		//如果涟漪二没有存活，使其复活并初始化半径和位置
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}
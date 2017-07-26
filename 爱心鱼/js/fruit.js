//果实的构造函数
function fruitObj(){
	//果实是否存活
	this.alive=[];
	//果实的位置
	this.x=[];
	this.y=[];
	//果实的半径
	this.l=[];
	//果实上升的速度
	this.spd=[];
	//果实从哪根海藻上产生
	this.aneNO=[];
	//果实的种类
	this.fruitType=[];
	//定义两张图片
	this.orange=new Image();
	this.blue=new Image();
}
//果实的数量
fruitObj.prototype.num=30;
//果实的消失函数
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}
//果实的初始化函数
fruitObj.prototype.init=function(){
	for (var i=0;i<this.num;i++) {
		//果实存活
		this.alive[i]=false;
		//果实位置初始化
		this.x[i]=0;
		this.y[i]=0;
		//果实半径初始化
		this.l[i]=0;
		this.aneNO[i]=0;
		//果实上升速度初始化
		this.spd[i]=Math.random()*0.01+0.005;
		//果实种类初始化
		this.fruitType[i]="";
	}
	//图片地址
	this.orange.src="img/fruit.png";
	this.blue.src="img/blue.png";
}
fruitObj.prototype.draw=function(){
	for (var i=0;i<this.num;i++) {
		if(this.alive[i]){
			//绘制不同的果实
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			//如果果实的半径小于等于14.则半径增大，否则上升。
			if(this.l[i]<=14){
				var no=this.aneNO[i];
				this.x[i]=ane.headx[no];
				this.y[i]=ane.heady[no];
				this.l[i]+=this.spd[i]*deltaTime;
			}else{
				this.y[i]-=this.spd[i]*5*deltaTime;
			}
			//果实绘制
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			//果实上升到一定高度后消失
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}

	}
}
//果实产生函数
fruitObj.prototype.born=function(i){
	//果实从随机的海藻上产生
	this.aneNO[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	//不同的果实产生的概率
	if(ran<0.2){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}
//果实监听函数
function fruitMonitor(){
	var num=0;
	for (var i=0;i<fruit.num;i++) {
		//如果果实存活，num+1
		if(fruit.alive[i]){
			num++;
		}
	}
	//如果果实数量小于15，就发送一个果实
	if(num<15){
		sendFruit();
		return;
	}
}
//果实发送函数
function sendFruit(){
	for (var i=0;i<fruit.num;i++) {
		//如果有果实处于消失状态，使其复活
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

//变量声明
var can1,can2,ctx1,ctx2,lastTime,deltaTime,canWidth,canHeight,ane,fruit,mom,baby,mx,my,data,wave,halo,dust;
var bgPic=new Image();
var babyTail=[];
var babyEye=[];
var babyBody=[];
var momTail=[];
var momEye=[];
var momBodyOrange=[];
var momBodyBlue=[];
var dustPic=[];
//主函数
window.onload=function game(){
	init();//初始化
	lastTime=Date.now();//获取1970 年 1 月 1日午夜与当前日期之间的毫秒数。
	deltaTime=0;//每一帧的时间
	gameloop();//
}
//初始化函数
function init(){
	//获得画布一
	can1=document.getElementById("canvas1");
	//获得画笔一
	ctx1=can1.getContext("2d");
	//获得画布二
	can2=document.getElementById("canvas2");
	//获得画笔二
	ctx2=can2.getContext("2d");
	//给画布一加上鼠标移动的事件
	can1.addEventListener("mousemove",onMouseMove,false);
	//定义画笔一的样式
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";
	//定义背景的地址
	bgPic.src="img/background.jpg";
	//获得画布一的宽度和高度
	canWidth=can1.width;
	canHeight=can1.height;
	//实例化海藻对象
	ane=new aneObj();
	//海藻初始化
	ane.init();
	//实例化果实对象
	fruit=new fruitObj();
	//果实初始化
	fruit.init();
	//实例化大鱼对象
	mom=new momObj();
	//大鱼初始化
	mom.init();
	//鼠标位置初始化
	mx=0;
	my=0;
	//实例化小鱼对象
	baby=new babyObj();
	//小鱼初始化
	baby.init();
	//实例化分数对象
	data=new dataObj();
	//实例化涟漪对象
	wave=new waveObj();
	//涟漪初始化
	wave.init();
	//实例化涟漪二对象
	halo=new haloObj();
	//涟漪二初始化
	halo.init();
	//实例化灰尘对象
	dust=new dustObj();
	//灰尘初始化
	dust.init();
	//定义每一种灰尘的地址
	for (var i=0;i<7;i++) {
		dustPic[i]=new Image();
		dustPic[i].src="img/dust"+i+".png";
	}
	//定义每一种小鱼尾巴的地址
	for (var i=0;i<8;i++) {
		babyTail[i]=new Image();
		babyTail[i].src="img/babyTail"+i+".png";
		
	}
	//定义每一种小鱼眼睛的地址
	for (var i=0;i<2;i++) {
		babyEye[i]=new Image();
		babyEye[i].src="img/babyEye"+i+".png";
	}
	//定义每一种小鱼身体的地址
	for (var i=0;i<20;i++) {
		babyBody[i]=new Image();
		babyBody[i].src="img/babyFade"+i+".png";
	}
	//定义每一种大鱼尾巴的地址
	for (var i=0;i<8;i++) {
		momTail[i]=new Image();
		momTail[i].src="img/bigTail"+i+".png";
	}
	//定义每一种大鱼眼睛的地址
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="img/bigEye"+i+".png";
	}
	//定义每一种大鱼身体的地址
	for (var i=0;i<8;i++) {
		momBodyOrange[i]=new Image();
		momBodyOrange[i].src="img/bigSwim"+i+".png";
		momBodyBlue[i]=new Image();
		momBodyBlue[i].src="img/bigSwimBlue"+i+".png";
	}
}

function gameloop(){
	//请求动画帧函数
	window.requestAnimFrame(gameloop);
	//获得每一帧的时间,如果一帧的时间超过40，则定义那一帧的时间为40
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40){
		deltaTime=40;
	}
	//背景绘制
	drawBackground();
	//海藻绘制
	ane.draw();
	//果实数量监听
	fruitMonitor();
	//果实绘制
	fruit.draw();
	//清空画布
	ctx1.clearRect(0,0,canWidth,canHeight);
	//大鱼绘制
	mom.draw();
	//大鱼和果实的碰撞检测
	momFruitsCollision();
	//大鱼和小鱼的碰撞检测
	momBabyCollision();
	//小鱼绘制
	baby.draw();
	//分数绘制
	data.draw();
	//涟漪绘制
	wave.draw();
	//涟漪二绘制
	halo.draw();
	//灰尘绘制
	dust.draw();
}
//获得鼠标的位置
function onMouseMove(e){
	if(!data.gameOver){
		//能力检测
		if(e.offsetX||e.layerX){
		mx=e.offsetX==undefined?e.layerX:e.offsetX;
		my=e.offsetY==undefined?e.layerY:e.offsetY;
	}
	}

}

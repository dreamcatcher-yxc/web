$(function(){
    $('#pdata').html('<canvas id="canvas"></canvas>');
    var WINDOW_WIDTH = 920;
		var WINDOW_HEIGHT = 400;
		var RADIUS = 7; //球半径
		var NUMBER_GAP = 10; //数字之间的间隙
		var u=0.65; //碰撞能量损耗系数
		var context; //Canvas绘制上下文
		var balls = []; //存储彩色的小球
		const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //彩色小球的颜色
		var currentNums = []; //屏幕显示的8个字符
		var digit =
                [
                    [
                        [0,0,1,1,1,0,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,0,1,1,0],
                        [0,0,1,1,1,0,0]
                    ],//0
                    [
                        [0,0,0,1,1,0,0],
                        [0,1,1,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [1,1,1,1,1,1,1]
                    ],//1
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,1,1],
                        [1,1,1,1,1,1,1]
                    ],//2
                    [
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,1,0,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//3
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,0],
                        [0,0,1,1,1,1,0],
                        [0,1,1,0,1,1,0],
                        [1,1,0,0,1,1,0],
                        [1,1,1,1,1,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,1,1]
                    ],//4
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,1,1,1,1,0],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//5
                    [
                        [0,0,0,0,1,1,0],
                        [0,0,1,1,0,0,0],
                        [0,1,1,0,0,0,0],
                        [1,1,0,0,0,0,0],
                        [1,1,0,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//6
                    [
                        [1,1,1,1,1,1,1],
                        [1,1,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,0,0,1,1,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0],
                        [0,0,1,1,0,0,0]
                    ],//7
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,1,1,0]
                    ],//8
                    [
                        [0,1,1,1,1,1,0],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [1,1,0,0,0,1,1],
                        [0,1,1,1,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,0,1,1],
                        [0,0,0,0,1,1,0],
                        [0,0,0,1,1,0,0],
                        [0,1,1,0,0,0,0]
                    ],//9
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0],
                        [0,0,0,0]
                    ]//:
                ];

		function drawDatetime(cxt){
      // 将 8 个位置上需要显示的的数字全部计算出来.
			var nums = [];
			context.fillStyle="#005eac"
			var date = new Date();
			var offsetX = 70, offsetY = 30;
			var hours = date.getHours();
			var num1 = Math.floor(hours / 10);
			var num2 = hours % 10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var minutes = date.getMinutes();
			var num1 = Math.floor(minutes/10);
			var num2 = minutes%10;
			nums.push({num: num1});
			nums.push({num: num2});
			nums.push({num: 10}); //冒号
			var seconds = date.getSeconds();
			var num1 = Math.floor(seconds/10);
			var num2 = seconds%10;
			nums.push({num: num1});
			nums.push({num: num2});

      // 将计算出的时间信息全部绘制到画板之上.
			for(var x = 0;x < nums.length; x++){
				nums[x].offsetX = offsetX;
				offsetX = drawSingleNumber(offsetX,offsetY, nums[x].num,cxt);
				//两个数字连一块，应该间隔一些距离
				if(x < nums.length - 1){
					if((nums[x].num != 10) &&(nums[x+1].num != 10)){
						offsetX += NUMBER_GAP;
					}
				}
			}

			//说明这是初始化
			if(currentNums.length ==0){
				currentNums = nums;
			}else{
				//进行比较
				for(var index = 0;index<currentNums.length;index++){
					if(currentNums[index].num!=nums[index].num){
						//不一样时，添加彩色小球
						addBalls(nums[index]);
						currentNums[index].num=nums[index].num;
					}
				}
			}
			renderBalls(cxt);
			updateBalls();

			return date;
		}

		function addBalls(item) {
			var num = item.num;
			var numMatrix = digit[num]; // 得到相应数字的矩阵.
			for(var y = 0;y<numMatrix.length;y++){
				for(var x = 0;x<numMatrix[y].length;x++){
					if(numMatrix[y][x]==1){
						var ball={
							offsetX:item.offsetX+RADIUS+RADIUS*2*x, // x 偏移量
							offsetY:30+RADIUS+RADIUS*2*y, // y 偏移量
							color:colors[Math.floor(Math.random()*colors.length)], // 随机生成一个颜色
							g:1.5+Math.random(), //
							vx:Math.pow(-1, Math.ceil(Math.random()*10))*4+Math.random(), // 每次小球的 x 变化量
							vy:-5 // 每次小球的 y 变化量.
						}
						balls.push(ball);
					}
				}
			}
		}

		function renderBalls(cxt){
			for(var index = 0;index<balls.length;index++){
				cxt.beginPath();
				cxt.fillStyle=balls[index].color;
				cxt.arc(balls[index].offsetX, balls[index].offsetY, RADIUS, 0, 2*Math.PI);
				cxt.fill();
			}
		}

		function updateBalls () {
			var i =0;
			for(var index = 0;index<balls.length;index++){
				var ball = balls[index];
				ball.offsetX += ball.vx;
				ball.offsetY += ball.vy;
				ball.vy+=ball.g;
				if(ball.offsetY > (WINDOW_HEIGHT-RADIUS)){
					ball.offsetY= WINDOW_HEIGHT-RADIUS;
					ball.vy=-ball.vy * u; // 小球已经落地, 能量变为原来的 0.65 倍, 并且小球的方向运动的方向变为相反的方向.
				}
				if(ball.offsetX>RADIUS&&ball.offsetX<(WINDOW_WIDTH-RADIUS)){
          // 还在边界内的小球则保存.
          balls[i]=balls[index];
					i++;
				}
			}
			//去除出边界的球
			for(;i<balls.length;i++){
				balls.pop();
			}
		}

		function drawSingleNumber(offsetX, offsetY, num, cxt){
			var numMatrix = digit[num];
			for(var y = 0;y<numMatrix.length;y++){
				for(var x = 0;x<numMatrix[y].length;x++){
					if(numMatrix[y][x]==1){
						cxt.beginPath();
						cxt.arc(offsetX+RADIUS+RADIUS*2*x,offsetY+RADIUS+RADIUS*2*y,RADIUS,0,2*Math.PI);
						cxt.fill();
					}
				}
			}
			cxt.beginPath();
			offsetX += numMatrix[0].length*RADIUS*2;
			return offsetX;
		}

		var canvas = document.getElementById("canvas");
		canvas.width=WINDOW_WIDTH;
		canvas.height=WINDOW_HEIGHT;
		context = canvas.getContext("2d");

		//记录当前绘制的时刻
		var currentDate = new Date();

		setInterval(function(){
			//清空整个Canvas，重新绘制内容
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			drawDatetime(context);
		}, 50)
});

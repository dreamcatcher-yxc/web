var Time = {
    __ctx : null, // canvas 上下文对象
    __balls : [], // 画布中需要重新绘制的小球
    __interval : 10, // 画布重新绘制间隔时间
    __nums : NUMS, // 所有的数字矩阵表示。
    __preDateTime : null, // 记录上一次重新绘制画布的时候显示的时间。
    __colors : ['#3691ff', '#ffde64', '#e3697b', '#4dff12', '#9734ff', '#96e3ff', '#ff2695'],

    init : function() {
      $('#canvas').attr('width', window.innerWidth + 'px');
      $('#canvas').attr('height', window.innerHeight + 'px');
      this.__ctx = document.getElementById('canvas').getContext('2d');
    },

    run : function() {
        var that = this;
        setInterval(function() {
            (function () {
                for(var i = 0; i < this.__balls.length; i++) {
                    var ball = this.__balls[i];
                    ball.x += ball.vx / 1000;
                    var ty = ball.vy * this.__interval / 1000 + (ball.isDown ? 1 : -1) * 0.5 * ball.a * Math.pow(this.__interval / 1000, 2);
                    if(ball.isDown) {
                        // 下落, 以画板高度为反弹边界
                        if(ball.y + ty < window.innerHeight - ball.r) {
                            ball.y += ty;
                            ball.vy += ball.a * this.__interval / 1000;
                        } else {
                            if(ball.vx == 0) {
                                // 下落的时候没有设置水平速度, 则随机设置水平速度。
                                var toLeft = Math.floor(Math.random() * 2) % 2 == 0;
                                ball.vx = (toLeft ? -1 : 1) * Math.floor(Math.random() * 500 + 500);
                            }
                            ball.isDown = false;
                        }
                    } else {
                        // 上升，当速度下降为 0 的时候开始再次下落，适当增大减速度。
                        ball.vy = ball.vy - ball.a * 1.7 * this.__interval / 1000;
                        ball.y -= ty;
                        if(ball.vy <= 0) {
                            ball.isDown = true;
                        }
                    }
                    // 如果当前小球的位置已经超出了边界，则直接去除小球。
                    if(ball.x <= 0 || ball.x > window.innerWidth + ball.r) {
                        this.__balls.splice(i, 1);
                        // console.log('ball.x: ' + ball.x + ', window.innerWidth: ' + window.innerWidth + ', ball.r: ' + ball.r);
                        // console.log('小球被移除了, 剩余: ' + this.__balls.length);
                    }
                }
                this.__draw();
            }).call(that);
        }, this.__interval);
    },

    // 重新绘制画布
    __draw : function () {
        this.__ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.__drawClock();
    },

    // 绘制电子时间
    __drawClock : function () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var dateTime = (hours < 10 ? ('0' + hours) : + hours) + ':' + (minutes < 10 ? ('0' + minutes) : + minutes) + ':' + (seconds < 10 ? ('0' + seconds) : + seconds);
        var needGenerateBallsNumberIndexs = [];
        if(this.__preDateTime == null) {
            needGenerateBallsNumberIndexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }else if(this.__preDateTime != dateTime) {
            for(var i = 0; i < this.__preDateTime.length; i++) {
                if(dateTime[i] != this.__preDateTime[i]) {
                    needGenerateBallsNumberIndexs.push(i);
                }
            }
        }
        this.__preDateTime = dateTime;
        for(var i = 0; i < dateTime.length; i++) {
            var sub = dateTime[i];
            if(':' === sub) {
                this.__drawNumbers(this.__nums[10], 6, 11 * (i + 1), 3, '#3691ff', $.inArray(i, needGenerateBallsNumberIndexs) >= 0);
            } else {
                this.__drawNumbers(this.__nums[parseInt(sub)], 6, 11 * (i + 1), 3, '#3691ff', $.inArray(i, needGenerateBallsNumberIndexs) >= 0);
            }
        }
        for(var i = 0; i < this.__balls.length; i++) {
            var ball = this.__balls[i];
            this.__ctx.beginPath();
            this.__ctx.fillStyle = ball.color;
            this.__ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
            this.__ctx.closePath();
            this.__ctx.fill();
        }
    },

    /**
     *  绘制数字矩阵
     * @param numArr: 10 * 10 数字举证，使用一维数组表示。
     * @param radius: 半径（单位: 像素）。
     * @param offsetX: 左偏量 <br/>
     *      ex:
     *      <p>radius: 10, offset: 10</p>
     *      <p>则表示矩阵的最左边距离画板左边的距离为 10（半径） * 2  * 10（偏移量） = 200 px</p>
     * @param offsetY: 顶部偏移量，与 offsetX 同理。
     * @param color: 数字矩阵显示的颜色。
     * @param generateBalls: 是否生成小球。
     * @private
     */
    __drawNumbers : function (numArr, radius, offsetX, offsetY, color, generateBalls) {
        this.__ctx.fillStyle = color;
        for(var i = 0; i < numArr.length; i++) {
            if(numArr[i] != 0) {
                var x = (i % 10 + 0.5 + offsetX) * radius * 2;
                var y = (Math.floor(i / 10) + 0.5 + offsetY) * radius * 2;
                // 在相应的位置上生成弹跳小球。
                if(generateBalls) {
                    var toLeft = Math.floor(Math.random() * 2) % 2 == 0;
                    var ballX = x + (toLeft ? -1 : 1) * (Math.floor(Math.random() * (30 - 10)) + 10);
                    var ballY = y - (Math.floor(Math.random() * (30 - 10)) + 10);
                    // var ballVX = (toLeft ? -1 : 1) * Math.floor(Math.random() * 500 + 500);
                    this.__balls.push(this.__generateBall(ballX, ballY, 0, this.__getColor()));
                }
                this.__ctx.beginPath();
                this.__ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                this.__ctx.closePath();
                this.__ctx.fill();
            }
        }
    },

    /**
     * 生成小球描述信息
     * x: 小球球心在画布上的 x 坐标（单位: px）
     * y: 小球球心在画布上的 y 坐标（单位: px）
     * vx: 小球初始水平速度（单位: s）
     * xy: 小球初始垂直速度（单位: s）
     * a: 小球下落加速度（单位: s）
     * r: 小球半径（单位: px）
     */
    __generateBall : function (x, y, vx, color) {
        return {x : x, y : y, vx : vx, vy : 0, a : 500, r : 6, color : color, isDown : true};
    },

    __getColor : function () {
        return this.__colors[Math.floor(Math.random() * this.__colors.length)];
    }
}

Time.init();
Time.run();
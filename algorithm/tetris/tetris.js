$(document).ready(function () {
    Game.init();
    Game.begin();
});

var Game = {
    /**
     * canvas 上下文对象。
     */
    __ctx : null,
    /**
     * 游戏上面的方块集合。
     */
    __currShape : null,

    /**
     * 已经堆积的方块集合（10 * 20 的二维数组, 采用一维数组表示）
     */
    __obstacle : [],

    /**
     * 方块工厂。
     */
    __shapeFactory : ShapeFactory,

    /**
     * 是否在快速下落。
     */
    __quickDown : false,

    /**
     * 自动下落。
     */
    __autoDownInterval : null,

    /**
     * 显示消除的行。
     */
    __promptRemoveRow : false,

    /**
     *  初始化。
     */
    init : function() {
        this.__ctx = document.getElementById('canvas').getContext('2d');
        // 初始化游戏面板区域
        for(var i = 0; i < 200; i++) {
            this.__obstacle.push(0);
        }
    },

    /**
     * 开始游戏
     */
    begin : function() {
        var newShape = this.__shapeFactory.getShape(Math.floor(Math.random() * 7));
        newShape.init(); // 初始化新创建的方块
        this.__currShape = newShape;
        var that = this;
        that.__draw.call(that);
        // 绑定按钮事件
        // 上
        $(document).bind('keydown', 'w', function (evt) {
            var pos = that.__currShape.getPosition();
            var shapeData = that.__currShape.getNextShapeData();
            if(!that.__promptRemoveRow && !that.__quickDown && that.__canRemote(pos.left, pos.top, shapeData)) {
                that.__currShape.remote();
                that.__draw.call(that);
            }
        });

        // 左
        $(document).bind('keydown', 'a', function (evt) {
            var pos = that.__currShape.getPosition();
            var shapeData = that.__currShape.getShapeData();
            if(!that.__promptRemoveRow && !that.__quickDown && that.__canLeft(pos.left, pos.top, shapeData)) {
                that.__currShape.moveToLeft();
                that.__draw.call(that);
            }
        });

        // 右
        $(document).bind('keydown', 'd', function (evt) {
            var pos = that.__currShape.getPosition();
            var shapeData = that.__currShape.getShapeData();
            if(!that.__promptRemoveRow && !that.__quickDown && that.__canRight(pos.left, pos.top, shapeData)) {
                that.__currShape.moveToRight();
                that.__draw.call(that);
            }
        });

        // 下
        $(document).bind('keydown', 's', function (evt) {
            if(!that.__promptRemoveRow) {
                var time = setInterval(function () {
                    var pos = that.__currShape.getPosition();
                    var shapeData = that.__currShape.getShapeData();
                    if(that.__canDown(pos.left, pos.top, shapeData)) {
                        that.__currShape.down(); // 下落一格
                    } else {
                        clearInterval(time);
                        that.__quickDown = false;
                        return;
                    }
                    that.__draw.call(that);
                }, 20);
            }
        });

        setInterval(function() {
            if(that.__quickDown || that.__promptRemoveRow) {
                return;
            }
            var pos = that.__currShape.getPosition();
            var shapeData = that.__currShape.getShapeData();
            if(that.__canDown(pos.left, pos.top, shapeData)) {
                that.__currShape.down(); // 下落一格
            } else {
                that.__generateObstacle();
                that.__removeAllFullRow();
                // 重新生成新的方块。
                var newShape = that.__shapeFactory.getShape(Math.floor(Math.random() * 7));
                newShape.init(); // 初始化新创建的方块
                that.__currShape = newShape;
            }
            that.__draw.call(that);
        }, 600);
    },

    /**
     * 判断当前的方块是否能够下落。
     * @param left
     * @param top
     * @param shapeData
     * @return {boolean}
     * @private
     */
    __canDown : function (left, top, shapeData) {
        var hasConflict = this.__hasConflict(left, top + 1, shapeData);
        var topOfShapeData = this.__currShape.getTopByShapeData(shapeData);
        var heightOfShapeData = this.__currShape.getHeightByShapeData(shapeData);
        return (topOfShapeData + heightOfShapeData + 1 <= 20 && !hasConflict);
    },

    /**
     * 根据方块矩阵判断当前方块是否能够左移
     * @param left
     * @param top
     * @param shapeData
     * @return {boolean}
     * @private
     */
    __canLeft : function (left, top, shapeData) {
        var leftOfShapeData = this.__currShape.getLeftByShapeData(shapeData);
        var hasConflict = this.__hasConflict(left - 1, top, shapeData);
        return (leftOfShapeData > 0 && !hasConflict);
    },

    /**
     * 根据方块矩阵判断当前方块是否能够右移
     * @param left
     * @param top
     * @param shapeData
     * @return {boolean}
     * @private
     */
    __canRight : function (left, top, shapeData) {
        var leftOfShapeData = this.__currShape.getLeftByShapeData(shapeData);
        var widthOfShapeData = this.__currShape.getWidthByShapeData(shapeData);
        var hasConflict = this.__hasConflict(left + 1, top, shapeData);
        return ((leftOfShapeData + widthOfShapeData) < 10 && !hasConflict);
    },

    /**
     * 根据方块矩阵判断当前方块是否能够旋转
     * @param left
     * @param top
     * @param shapeData
     * @return {boolean}
     * @private
     */
    __canRemote : function (left, top, shapeData) {
        var leftOfNextShapeData = this.__currShape.getLeftByShapeData(shapeData);
        var widthOfNextShapeData = this.__currShape.getWidthByShapeData(shapeData);
        var topOfShapeData = this.__currShape.getTopByShapeData(shapeData);
        var heightOfNextShapeData = this.__currShape.getHeightByShapeData(shapeData);
        var hasConflict = this.__hasConflict(left, top, shapeData);
        return (leftOfNextShapeData >= 0 && (leftOfNextShapeData + widthOfNextShapeData) <= 10 && (topOfShapeData + heightOfNextShapeData) <= 20 && !hasConflict);
    },

    /**
     * 根据当前方块数据判断和障碍物是否有重叠部分。
     * @param left: 方块矩阵左边距
     * @param top: 方块矩阵上边距
     * @param shapeData: 方块矩阵
     * @return {boolean}
     * @private
     */
    __hasConflict : function (left, top, shapeData) {
        for(var i = 0; i < 16; i++) {
            // 判断方块是否会超出底部或者和已经堆积的方块产生重叠。
            if(Math.floor(i/4) + top < 0) {
                continue;
            }
            if(shapeData[i] != 0 && this.__obstacle[(Math.floor(i/4) + top) * 10 + i % 4 + left] != 0) {
                return true;
            }
        }
        return false;
    },

    /**
     * 生成障碍物
     * @private
     */
    __generateObstacle : function () {
        var shapeData = this.__currShape.getShapeData();
        var pos = this.__currShape.getPosition();
        for(var i = 0; i < 16; i++) {
            if(shapeData[i] != 0) {
                var x = pos.left + i % 4;
                var y = pos.top + Math.floor(i / 4);
                this.__obstacle[y * 10 + x] = 1;
            }
        }
    },

    /**
     * 消除所有的满行
     * @private
     */
    __removeAllFullRow : function () {
        this.__promptRemoveRow = true;
        var isBlankRow = false;
        var isFullRow = false;
        l:
        for(var y = 19; y > 0; y--) {
            isBlankRow = true;
            isFullRow = true;
            for(var x = 0; x < 10; x++) {
                var val = this.__obstacle[y * 10 + x];
                if(val == 0) {
                    isFullRow = false;
                } else {
                    isBlankRow = false;
                }
            }
            if(isFullRow) {
                this.__removeFullRow(y);
            }
            if(isBlankRow) {
                break l;
            }
        }
        this.__promptRemoveRow = false;
    },

    /**
     * 消除满行
     * @param row
     * @private
     */
    __removeFullRow : function (row) {
        var isBlankRow = false;
        l:
        for(var y = row; y > 0; y--) {
            isBlankRow = true;
            for(var x = 0; x < 10; x++) {
                this.__obstacle[y * 10 + x] = this.__obstacle[(y - 1) * 10 + x];
                if(this.__obstacle[y * 10 + x] != 0) {
                    isBlankRow = false;
                }
            }
            if(isBlankRow) {
                break l;
            }
        }
    },

    /**
     * 绘制游戏区域。
     * @param: 长度为 16 的一维数组。
     */
    __draw : function() {
        this.__ctx.clearRect(0, 0, 300, 600);
        this.__ctx.fillStyle = '#FF0000';
        // 绘制方块
        var shapeData = this.__currShape.getShapeData();
        var pos = this.__currShape.getPosition();
        for(var i = 0; i < 16; i++) {
            if(shapeData[i] != 0) {
                var x = i % 4 + pos.left;
                var y = Math.floor(i / 4) + pos.top;
                this.__ctx.fillRect(x * 30 + 2, y * 30 + 2, 28, 28);
            }
        }

        // 绘制已经下落的方块集合

        for(var i = 0; i < 300; i++) {
            var val = this.__obstacle[i];
            if(val != 0) {
                if(val == 1) {
                    this.__ctx.fillStyle = '#3c3f41';
                } else if(val == 2) {
                    this.__ctx.fillStyle = '#5faa2f';
                }
                var x = i % 10;
                var y = Math.floor(i/10);
                this.__ctx.fillRect(x * 30 + 2, y * 30 + 2, 28, 28);
            }
        }
    },
}
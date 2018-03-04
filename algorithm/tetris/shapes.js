var ShapeFactory = {
    /**
     * 0 ~ 6 之间的数字，生成相应的方块。
     * @param index
     */
    __shapes : [
        // I
        [
            [
                0, 0, 0, 0,
                1, 1, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
            ]
        ],
        // T
        [
            [
                0, 1, 0, 0,
                1, 1, 1, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                0, 1, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0,
                1, 1, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                1, 1, 0, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ]
        ],
        // Z
        [
            [
                1, 1, 0, 0,
                0, 1, 1, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 0, 1, 0,
                0, 1, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ]
        ],
        // F
        [
            [
                0, 1, 1, 0,
                1, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                0, 1, 1, 0,
                0, 0, 1, 0,
                0, 0, 0, 0,
            ]
        ],
        // J
        [
            [
                1, 0, 0, 0,
                1, 1, 1, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 1, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0,
                1, 1, 1, 0,
                0, 0, 1, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                0, 1, 0, 0,
                1, 1, 0, 0,
                0, 0, 0, 0,
            ]
        ],
        // L
        [
            [
                0, 0, 1, 0,
                1, 1, 1, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 1, 0,
                0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0,
                1, 1, 1, 0,
                1, 0, 0, 0,
                0, 0, 0, 0,
            ],
            [
                1, 1, 0, 0,
                0, 1, 0, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
            ]
        ],
        // O
        [
            [
                1, 1, 0, 0,
                1, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]
        ]
    ],

    getShape: function (index) {
        index = index % 7;
        return {
            __shape: this.__shapes[index],
            __currShapeIndex : 0,
            __currShapeData : this.__shapes[index][0],
            __left : 0,
            __top : 0,
            __totalWidth : 10, // 游戏区域宽
            __totalHeight : 20, // 游戏区域高

            /**
             * 初始化方块参数
             */
            init : function () {
                var w = this.getWidthByShapeData(this.__currShapeData);
                var shapeData = this.__currShapeData;
                var vehicleEndIndex = 0;
                for(var y = 4; y > 0; y--) {
                    for(var x = 0; x < 4; x++) {
                        if(shapeData[y * 4 + x - 1] != 0) {
                            vehicleEndIndex = y;
                        }
                    }
                }
                this.__left = Math.floor((this.__totalWidth - w) / 2);
                this.__top = vehicleEndIndex * -1;
            },

            /**
             * 获取当前显示的方块矩阵
             * @returns {number[]|*}
             */
            getShapeData : function () {
                return this.__currShapeData;
            },

            /**
             * 旋转
             */
            remote : function () {
                var l = this.__shape.length;
                this.__currShapeIndex = (this.__currShapeIndex + 1) % l;
                if(l > 1) {
                    this.__currShapeData = this.__shape[this.__currShapeIndex];
                }
            },

            /**
             * 左移
             */
            moveToLeft : function () {
                this.__left--;
            },

            /**
             * 右移
             */
            moveToRight : function() {
                this.__left++;
            },

            /**
             * 向下移动一格。
             */
            down : function () {
                this.__top++;
            },

            /**
             * 获取当前方块的位置
             * @returns {{left: number | *, top: number}}
             */
            getPosition : function() {
                return {left : this.__left, top : this.__top};
            },

            /**
             * 根据当前方块数据数组信息获取方块的宽
             * @param shapeData
             * @private
             */
            getWidthByShapeData : function (shapeData) {
                var width = 4;
                l1:
                for(var x = 0; x < 4; x++) {
                    for(var y = 0; y < 4; y++) {
                        if(shapeData[y * 4 + x] != 0) {
                            width -= x;
                            break l1;
                        }
                    }
                }
                l2:
                for(var x = 4; x > 0; x--) {
                    for(var y = 0; y < 4; y++){
                        if(shapeData[y * 4 + x - 1] != 0) {
                            width -= (4 - x);
                            break l2;
                        }
                    }
                }
                return width;
            },

            /**
             * 根据当前方块数据数组信息获取方块的高
             * @param shapeData
             * @private
             */
            getHeightByShapeData : function (shapeData) {
                var height = 4;
                l1:
                for(var y = 0; y < 4; y++) {
                    for(var x = 0; x < 4; x++) {
                        if(shapeData[y * 4 + x] != 0) {
                            height -= y;
                            break l1;
                        }
                    }
                }
                l2:
                for(var y = 4; y > 0; y--) {
                    for(var x = 0; x < 4; x++) {
                        if(shapeData[(y - 1) * 4 + x] != 0) {
                            height -= (4 - y);
                            break l2;
                        }
                    }
                }
                return height;
            },

            /**
             * 根据当前方块数据获取当前方块的左边距
             * @param shapeData
             */
            getLeftByShapeData : function (shapeData) {
                for(var x = 0; x < 4; x++) {
                    for(var y = 0; y < 4; y++) {
                        if(shapeData[y * 4 + x] != 0) {
                            return x + this.__left;
                        }
                    }
                }
            },

            /**
             * 根据当前方块数据获取当前方块的上边距
             * @param shapeData
             */
            getTopByShapeData : function (shapeData) {
                for(var y = 0; y < 4; y++) {
                    for(var x = 0; x < 4; x++) {
                        if(shapeData[y * 4 + x] != 0) {
                            return y + this.__top;
                        }
                    }
                }
            },

            /**
             * 当前方块的下一个形状形状的数组数据
             * @return {number[]|*}
             */
            getNextShapeData : function () {
                var l = this.__shape.length;
                var tIndex = (this.__currShapeIndex + 1) % l;
                if(l > 1) {
                    return this.__shape[tIndex];
                }
                return this.__currShapeData;
            },
        };
    }
}
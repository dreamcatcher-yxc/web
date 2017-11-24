<template scope>
    <table class="table table-responsive">
        <caption>用户</caption>
        <thead>
            <tr>
                <th>编号</th>
                <th>用户名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>邮箱</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in rows">
                <td>{{ convertToRowIndex(index) }}</td>
                <td>{{ row.username }}</td>
                <td>{{ row.gender }}</td>
                <td>{{ row.age }}</td>
                <td>{{ row.email }}</td>
                <td>
                    <button class="btn btn-primary">编辑</button>
                    <button class="btn btn-danger">删除</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="6" class="text-center">
                        <ul class="pagination">
                            <li v-if="page > 1" @click="goPage(page - 1)">
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li v-for="bar in bars"  :class="page === bar ? 'active' : ''" @click="goPage(bar)"><a href="javascript:void(0)">{{ bar }}</a></li>
                            <li v-if="page < totalPage" @click="goPage(page + 1)">
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    export default {
        data () {
            return {
                rows : [],
                page : 1,
                row : 10,
                bars : [], // 分页条
                bs : 10, // 显示多少个分页条
                count : 0
            }
        },
        computed : {
            totalPage : function() {
                return Math.ceil(this.count / this.row);
            }
        },
        methods : {
            convertToRowIndex : function(value) {
                if(parseInt(value) !== value) {
                    return '';
                }
                return (this.page - 1) * this.row + value + 1;
            },
            calcBar : function() {
                let lbs = this.bs / 2;
                let start = this.page > (lbs % 2 == 0 ? lbs - 1 : lbs) ? this.page - lbs : 1;
                let end = start + this.bs - 1 < this.totalPage ? start + this.bs - 1 : this.totalPage;
                this.bars = [];
                for(let i = start; i <= end; i++) {
                    this.bars.push(i);
                }
            },
            goPage : function(page) {
                this.page = page;
                this.loadRemoteData();
            },
            /*加载远程数据*/
            loadRemoteData : function() {
                let that = this;
                let page = this.page;
                let row = this.row;
                this.$http.post('/list', {
                    page,
                    row
                }).then((response) => {
                    console.log(that.bar);
                    let rows = response.data.body.rows;
                    that.count = response.data.body.count;
                    that.calcBar();
//                    while (that.rows.length > 0) {
//                        that.r/
//                    }
                    that.rows = [];
                    rows.reduce((pc, cv) => {
                        that.rows.push(cv);
                    }, 0);
                });
            }
        },
        created() {
            this.loadRemoteData();
        },
        watch : {
        }
    }
</script>

<style scope>

</style>
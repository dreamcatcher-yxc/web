<template scope>
    <table class="table table-responsive">
        <caption>标题</caption>
        <thead>
            <tr>
                <th>编号</th>
                <th>用户名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for>
                <td>1</td>
                <td>张三</td>
                <td>男</td>
                <td>20</td>
                <td>
                    <button class="btn btn-primary">编辑</button>
                    <button class="btn btn-danger">删除</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>李四</td>
                <td>女</td>
                <td>19</td>
                <td>
                    <button class="btn btn-primary">编辑</button>
                    <button class="btn btn-danger">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        data () {
            return {
                list : null
            }
        },
        created() {
            this.$http.get('/list', {
                params : {
                    username : 'zhnangsan',
                }
            }).then((response) => {

            });
        },
        watch : {
        }
    }
</script>

<style scope>

</style>
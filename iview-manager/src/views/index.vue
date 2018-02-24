<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 50px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <i-col span="24">
                <h1>
                    <img src="../images/logo.png">
                </h1>
                <h2>
                    <p v-text="'欢迎您， ' + user.username"></p>
                </h2>
                <Row type="flex" justify="center" class="code-row-bg">
                    <Button type="ghost">
                        <a href="javascript:void(0)">API 接口测试</a>
                    </Button>
                    <Button type="ghost">
                        <a href="javascript:void(0)">后台管理</a>
                    </Button>
                </Row>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import routers from '~src/router';

    export default {
        data() {
            return {
                routers,
                user : this.$store.state.userInfo
            }
        },
        mounted() {

        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: '提示',
                    content: this.user.username
                });
            }
        }
    }
</script>

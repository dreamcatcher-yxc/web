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
                    <p>欢迎</p>
                    <Button type="ghost" @click="handleStart">开始使用 iview</Button>
                </h2>
                <Row type="flex" justify="center" class="code-row-bg">
                    <i-col v-for="router in routers" span="2">
                        <Button type="ghost">
                            <router-link :to="router.path">{{router.meta.title == '' || router.meta.title === undefined ? '首页' : router.meta.title}}</router-link>
                        </Button>
                    </i-col>
                </Row>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import routers from '../router';

    export default {
        data() {
            return {
                routers
            }
        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: '提示',
                    content: 'author: yxc!'
                });
            }
        }
    }
</script>

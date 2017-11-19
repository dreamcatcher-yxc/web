<style scoped>
    @import 'styles/common.css';
    .border {border: 1px solid red;}
</style>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">Vue 单页面测试</a>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">地址 <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li v-for="path in paths" >
                                            <router-link :to="path">{{ path }}</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <form class="navbar-form navbar-left" role="search">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="菜单搜索...">
                                </div>
                                <button type="submit" class="btn btn-default">搜索</button>
                            </form>
                            <ul class="nav navbar-nav navbar-right">
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div><!-- /.container-fluid -->
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-2 border">
                菜单
            </div>
            <div class="col-lg-10 border">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                paths : this.$store.state.paths
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>

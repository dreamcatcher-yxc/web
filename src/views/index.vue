<style scope>
    @import '../styles/common.css';
    .border {border: 1px solid #e5e5e5; border-radius: 5px;}
    .ztree * {font-size: 10pt;font-family:"Microsoft Yahei",Verdana,Simsun,"Segoe UI Web Light","Segoe UI Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol","Helvetica Neue",Arial}
    .ztree li ul{ margin:0; padding:0}
    .ztree li {line-height:30px;}
    .ztree li a {width:90%; height:30px;padding-top: 0px;}
    .ztree li a:hover {text-decoration:none; background-color: #E7E7E7;}
    .ztree li a span.button.switch {visibility:hidden}
    .ztree.showIcon li a span.button.switch {visibility:visible}
    .ztree li a.curSelectedNode {background-color:#D4D4D4;border:0;height:30px;}
    .ztree li span {line-height:30px;}
    .ztree li span.button {margin-top: -7px;}
    .ztree li span.button.switch {width: 16px;height: 16px;}

    .ztree li a.level0 span {font-size: 150%;font-weight: bold;}
    .ztree li span.button {background-image:url("../assets/imgs/left_menuForOutLook.png"); *background-image:url("../assets/imgs/left_menuForOutLook.gif")}
    .ztree li span.button.switch.level0 {width: 20px; height:20px}
    .ztree li span.button.switch.level1 {width: 20px; height:20px}
    .ztree li span.button.noline_open {background-position: 0 0;}
    .ztree li span.button.noline_close {background-position: -18px 0;}
    .ztree li span.button.noline_open.level0 {background-position: 0 -18px;}
    .ztree li span.button.noline_close.level0 {background-position: -18px -18px;}
</style>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <span style="color:red" class="glyphicon glyphicon-fire" aria-hidden="true"></span>
                                Vue 单页面测试
                            </a>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <!--<li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">地址 <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li v-for="path in paths" >
                                            <router-link :to="path">{{ path }}</router-link>
                                        </li>
                                    </ul>
                                </li>-->
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <img src="../assets/imgs/male-avatar.jpg" :alt="userInfo.nickname" class="img-circle">
                                        {{ userInfo.nickname }}<span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">个人设置</a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="#" @click="logout">退出登录</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div><!-- /.navbar-collapse -->

                    </div><!-- /.container-fluid -->
                </nav>
            </div>
        </div>

        <div class="row">
            <!--左侧菜单显示 -->
            <div class="col-lg-2">
                <ul id="menuTree" class="ztree border"></ul>
            </div>
            <!--页面展示-->
            <div class="col-lg-10 border">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import {getCookie} from "../util/cookieUtil";
    import {global} from '../config';

    export default {
        data () {
            return {
                paths : this.$store.state.paths,
                menuArr : this.$store.state.menuArr,
                userInfo : this.$store.state.userInfo
            }
        },
        mounted() {
            var that = this;
            let setting = {
                view: {
                    showLine: false,
                    showIcon: false,
                    selectedMulti: false,
                    dblClickExpand: false,
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick : function(event, treeId, treeNode) {
                        that.$router.push({path : treeNode.to});
                    }
                }
            };
            let treeObj = $("#menuTree");
            $.fn.zTree.init(treeObj, setting, this.menuArr);
        },
        beforeDestroy () {

        },
        methods: {
            logout() {
                let that = this;
                if(confirm('您确定要注销当前用户的登录状态吗?')) {
                    let uuid = this.userInfo.uuid;
                    this.axios.post('/logout', {uuid}).then(r => {
                        if(r.isOk()) {
                            that.$store.commit('notAuth');
                            that.$router.push({path : '/login'});
                        } else {
                            Toastr.error('注销失败!');
                        }
                    });
                }
            }
        }
    }
</script>

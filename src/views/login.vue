<style scope>

</style>

<template scope>
    <div class="row" style="margin-top: 5%">
        <div class="col-lg-offset-4 col-lg-4">
            <div class="panel" style="border: 1px solid #EEEEEE; border-radius: 10px;">
                <div class="panel-heading">
                    <h3 class="text-center">登录</h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="username" class="col-sm-2 control-label">用户名</label>
                            <div class="col-lg-10">
                                <input v-model.trim="username" type="text" class="form-control" id="username" placeholder="必填">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-sm-2 control-label">密码</label>
                            <div class="col-lg-10">
                                <input v-model.trim="password" type="password" class="form-control" id="password" placeholder="必填">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="checkCode" class="col-sm-2 control-label">验证码</label>
                            <div class="col-lg-8">
                                <input v-model="checkCode" type="text" class="form-control" id="checkCode" placeholder="必填">
                            </div>
                            <div class="col-lg-2">
                                <img src="http://10.66.30.142:9093/checkNumber" alt="点击切换" style="width: 100px; height: 34px; margin-left: -20px;" class="img-thumbnail">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <div class="checkbox">
                                    <label>
                                        <input v-model="remember" type="checkbox"> 记住我
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-5 col-sm-7">
                                <button type="reset" class="btn btn-default">重置</button>
                                <button type="submit" class="btn btn-primary" @click="login()">登录</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store';
    import {router} from '../router'
    import {setCookie} from '../util/cookieUtil';
    import {global} from '../config';

    export default {
        data () {
            return {
                username : '',
                password : '',
                checkCode : '',
                remember : false,
                userArr : store.state.userArr
            }
        },
        watch : {
//                remember(to, from) {
//                    console.log(to);
//                }
        },
        methods : {
            login() {
                for (let user of this.userArr) {
                    if(user.username == this.username && user.password == this.password) {
                        Toastr.success("登录成功!");
                        setCookie(global.userKey, JSON.stringify(user), 1);
                        router.push({path : '/'});
                        break;
                    } else {
                        Toastr.error("用户名或者密码错误!");
                    }
                }
            }
        }
    }
</script>
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
                            <label for="username" class="col-sm-2 control-label">用户</label>
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
                       <!-- <div class="form-group">
                            <label for="checkCode" class="col-sm-2 control-label">验证码</label>
                            <div class="col-lg-8">
                                <input v-model="checkCode" type="text" class="form-control" id="checkCode" placeholder="必填">
                            </div>
                            <div class="col-lg-2">
                                <img :src="checkCodeAddress"
                                     alt="点击切换"
                                     style="width: 100px; height: 34px; margin-left: -20px; cursor: pointer"
                                     class="img-thumbnail"
                                     @click="changeCheckCode()">
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
                        </div>-->
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
    export default {
        data () {
            return {
                username : '',
                password : '',
                checkCode : '',
                remember : false,
                checkCodeAddress: ''
            }
        },
        created(){
            this.changeCheckCode();
        },
        methods : {
            login() {
                var that = this;
                this.axios.post('/login', {
                    username : that.username,
                    password : that.password,
                    checkCode : that.checkCode
                }).then(r => {
                    if(r.isOk()) {
                        Toastr.success(r.msg());
                        that.$store.commit('hasAuth', r.getAttr('userInfo'));
                        that.$router.push({path : '/'});
                    } else {
                        Toastr.error(r.msg());
                    }
                });
            },
            changeCheckCode() {
                let that = this;
                this.axios.post('/checkCode').then(r => {
                    that.checkCodeAddress = r.getAttr('pic');
                    console.log(that.checkCodeAddress);
                });
            }
        }
    }
</script>
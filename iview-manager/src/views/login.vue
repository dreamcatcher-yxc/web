<style scoped>
    .header-row {margin-top: 10%; margin-bottom: 25px;}
</style>

<template>
    <div id="loginContainer">
        <Row type="flex" justify="center" class="header-row">
            <Col span="24">
                <h2 align="center">后台管理系统</h2>
            </Col>
        </Row>
        <Row type="flex" justify="center">
            <Col span="6">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="checkCode">
                        <Row>
                            <Col span="17">
                                <Input type="text" v-model="formInline.checkCode" placeholder="验证码">
                                    <Icon type="image" slot="prepend"></Icon>
                                </Input>
                            </Col>
                            <Col span="1" style="text-align: center">&nbsp;&nbsp;&nbsp;</Col>
                            <Col span="6">
                                <img src="/admin/checkcode"
                                     onclick="this.src = this.src + '?timestamp=' + new Date().getTime()"
                                     height="32"
                                     style="border: 1px solid #EEEEEE; border-radius: 5px; cursor: pointer"
                                     width="100%"
                                     title="换一张" />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row  type="flex" justify="center">
                            <Col span="6">
                                <Button type="primary" @click="handleSubmit('formInline')" :loading="loginLoading">登陆</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
    import config from 'src/config/config';
    import Vue from 'vue';

    export default {
        data () {
            return {
                remoteBaseUrl : config.remoteBaseUrl,
                loginLoading : false,
                formInline: {
                    username: '',
                    password: '',
                    checkCode : ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '用户名必填', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码必填.', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码最少 6 位', trigger: 'blur' }
                    ],
                    checkCode : [
                        { required: true, message: '验证码必填', trigger: 'blur'},
                        { type: 'string', len: 4, message: '验证码长度必须为 4 位', trigger: 'blur' },
                        {
                            validator(rule, value, callback, source, options) {
                                if(value.length != 4) {
                                    callback();
                                    return;
                                }
                                Vue.axios.post('/checkcode/valid', {
                                    checkCode : value
                                }).then(r => {
                                    if(r.isOk()) {
                                        callback();
                                    } else {
                                        callback(new Error('验证码不正确'));
                                    }
                                });
                            }
                        }
                    ]
                }
            }
        },
        mounted : function () {
          // var height = window.innerHeight;
          // var width = window.innerWidth;
          // document.querySelector('#loginContainer').style.backgroundSize = `${width}px ${height}px`;
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loginLoading = true;
                        this.axios.post('/login', {
                            username : this.formInline.username,
                            password : this.formInline.password,
                            checkCode : this.formInline.checkCode
                        }).then(r => {
                            if(r.isOk()) {
                                this.$router.push({path : '/views'});
                            } else {
                                this.$Message.error(r.msg());
                            }
                            this.loginLoading = false;
                        });
                    }
                })
            }
        }
    }
</script>
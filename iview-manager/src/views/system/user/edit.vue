<template>
    <div>
        <Row>
            <Col span="12">
                <a href="javascript:void(0)" onclick="window.history.go(-1)">
                    <Icon type="arrow-left-c" size="25"></Icon>
                </a>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="用户名" prop="username">
                        <Input type="text" v-model="formValidate.username" disabled/>
                    </FormItem>
                    <FormItem label="昵称" prop="nickname">
                        <Input type="text" v-model="formValidate.nickname"/>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <RadioGroup v-model="formValidate.gender">
                            <Radio label="1">男</Radio>
                            <Radio label="0">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <formItem label="年龄" prop="age">
                        <Input type="text" v-model="formValidate.age"/>
                    </formItem>
                    <formItem label="邮箱" prop="email">
                        <Input type="text" v-model="formValidate.email"/>
                    </formItem>
                    <FormItem label="简介" prop="remarks">
                        <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="用户简介信息"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading="submitIsLoading">保存</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>

</template>
<script>
    import Vue from 'vue';

    export default {
        data () {
            return {
                userId : this.$route.params.id,
                submitIsLoading : false,
                formValidate: {
                    username : '',
                    nickname : '',
                    gender: '',
                    age : '',
                    email : '',
                    remarks: ''
                },
                ruleValidate: {
                    nickname : [
                        { required: true, message: '昵称必填', trigger: 'blur' }
                    ],
                    gender: [
                        {
                            validator(rule, value, callback, source, options) {
                                console.log('开始校验...');
                                callback();
                            }
                        },
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    age : [
                        {required: true, message: '年龄必填', trigger: 'blur'},
                        {type: 'number', min : 1, max : 100, message: '年龄必须为整数，范围在 1 ~ 100 之间', trigger: 'blur'}
                    ],
                    email : [
                        {required: true, message: '邮箱必填', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    remarks : [
                        {type : 'string', min : 1, max : 200, message : '描述信息的长度限制在 1 ~ 200 个字符之间', trigger : 'blur'}
                    ]
                }
            }
        },
        mounted() { // 初始化加载数据
            this.axios
                .get('/users/' + this.userId)
                .then(r => {
                    if(r.isOk()) {
                        (function(user)  {
                            this.username = user.username;
                            this.nickname = user.nickname;
                            this.gender = user.gender;
                            this.age = user.age;
                            this.email = user.email;
                            this.remarks = user.remarks;
                        }).call(this.formValidate, r.getAttr('user'));
                    }
                });
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    return;
                    if (valid) {
                        console.log('开始提交表单数据...');
                        this.submitIsLoading = true;
                        this.axios.post('/users', {
                            username : this.formValidate.username,
                            gender : this.formValidate.gender,
                            remarks : this.formValidate.remarks
                        }).then(r => {
                            if(r.isOk()) {
                                this.$Message.success('修改成功!');
                            }
                            this.submitIsLoading = false;
                        })
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

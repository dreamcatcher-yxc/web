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
                        <Input type="text" v-model="formValidate.username" placeholder="用户名"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <RadioGroup v-model="formValidate.gender">
                            <Radio label="1">男</Radio>
                            <Radio label="0">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="简介" prop="remarks">
                        <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="用户简介信息"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading="submitIsLoading">添加</Button>
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
                submitIsLoading : false,
                formValidate: {
                    username: '',
                    gender: '',
                    remarks: ''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {
                            validator(rule, value, callback, source, options) {
                                if(value.trim().length > 0) {
                                    Vue.axios.get('/users/isexist', {
                                        params : {
                                            username : value
                                        }
                                    }).then(r => {
                                        if(r.isOk() && r.getAttr('exist')) {
                                            callback(new Error('该用户已经存在'));
                                        } else {
                                            callback();
                                        }
                                    });
                                }
                            }
                        }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log('开始提交表单数据...');
                        this.submitIsLoading = true;
                        this.axios.post('/users', {
                            username : this.formValidate.username,
                            gender : this.formValidate.gender,
                            remarks : this.formValidate.remarks
                        }).then(r => {
                            if(r.isOk()) {
                                this.$Message.success('添加成功!');
                                window.history.go(-1);
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

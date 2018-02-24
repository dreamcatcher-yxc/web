<style scoped>
    .operator-row {margin : 5px 5px}
    .table-row {border: 1px solid #eeeeee}
</style>
<template>
    <div>
        <Row class-name="operator-row">
            <Col span="24">
                <Button type="success" @click="toAddUserView">添加用户</Button>
                <Button type="error">删除所选</Button>
            </Col>
        </Row>
        <Row class-name="table-row">
            <Col span="24">
                <Table border :loading="loading" :columns="cols" :data="rows"></Table>
            </Col>
        </Row>
        <br>
        <Row type="flex" justify="center" align="middle">
            <Col span="12">
                <Page :total="total" size="small" placement="top" @on-change="onChange" @on-page-size-change="onPageSizeChange" show-elevator show-sizer></Page>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.axios.get("/users", {
                params : {
                    page : 0,
                    row : 10
                }
            }).then(r => {
                    this.page = 0;
                    this.total =  r.getAttr('count');
                    this.rows = r.getAttr('rows');
                    this.loading = false;
                });
        },
        data() {
            return {
                loading : true,
                page : 0,
                total : 0,
                cols: [
                    {
                        title : '编号',
                        key : 'index',
                        align : 'center',
                        render(h, params) {
                            return params.index + 1;
                        }
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        align : 'center'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align : 'center',
                        render(h, params) {
                            return params.row.gender == '1' ? '男' : '女';
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        align : 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align : 'center'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.id);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                rows : []
            }
        },
        methods: {
            show (id) {
                this.$router.push({path : '/views/user/edit/' + id});
            },
            remove (index) {
                this.rows.splice(index, 1);
            },
            onChange(page) {
                this.axios.get("/users", {
                    params : {
                        page : page,
                        row : 10
                    }
                }).then(r => {
                    this.page = r.getAttr('page');
                    this.total = r.getAttr('count');
                    this.rows = r.getAttr('rows');
                    this.loading = false;
                });
            },
            onPageSizeChange(row) {
                this.axios.get("/users", {
                    params : {
                        page : this.page,
                        row : row
                    }
                }).then(r => {
                    this.page = r.getAttr('page');
                    this.total = r.getAttr('count');
                    this.rows = r.getAttr('rows');
                    this.loading = false;
                });
            },
            toAddUserView() {
                this.$router.push({path : '/views/user/add'});
            }
        }
    }
</script>

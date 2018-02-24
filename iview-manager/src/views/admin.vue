
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: scroll;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        height: 100%;
        overflow-y: scroll;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .avatar {
        padding-top: 13px;
        height: 45px;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
     .child-view {
        margin: 300px auto;
         width: 100%;
         height: 100%;
         transition: all .5s cubic-bezier(.55,0,.1,1);
    }
</style>
<template>
    <div class="layout" :style="'height:' + height + 'px; width: ' + width + 'px'" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" @on-select="onSelectChange">
                    <div class="layout-logo-left"></div>
                    <template v-if="spanLeft >= 5">
                        <template v-for="menu in menus">
                            <!--存在子菜单-->
                            <template v-if="!!menu.subMenus">
                                <Submenu :name="menu.uuid">
                                    <template slot="title">
                                        <Icon :type="menu.iconClass" :size="iconSize"></Icon>
                                        <span class="layout-text">{{menu.text}}</span>
                                    </template>
                                    <MenuItem v-for="subMenu in menu.subMenus" :name="subMenu.uuid">
                                        <Icon :type="subMenu.iconClass" :size="iconSize"></Icon>
                                        <span class="layout-text">{{subMenu.text}}</span>
                                    </MenuItem>
                                </Submenu>
                            </template>
                            <!--不存在子菜单-->
                            <template v-else>
                                <MenuItem :name="menu.uuid">
                                    <Icon :type="menu.iconClass" :size="iconSize"></Icon>
                                    <span class="layout-text">{{menu.text}}</span>
                                </MenuItem>
                            </template>
                        </template>
                    </template>
                    <template v-else>
                        <!--收缩的时候显示-->
                        <MenuItem  v-for="menu in menus" :name="menu.uuid">
                            <Icon :type="menu.iconClass" :size="iconSize"></Icon>
                            <span class="layout-text">{{menu.text}}</span>
                        </MenuItem>
                    </template>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Row>
                        <i-col span="2">
                            <Button type="text" @click="toggleClick">
                                <Icon :type="spanLeft > 2 ? 'ios-arrow-back' : 'ios-arrow-forward'" size="34"></Icon>
                            </Button>
                        </i-col>
                        <i-col span="1" offset="19" class-name="avatar">
                            <Avatar src="/src/images/head_01.jpg" />
                        </i-col>
                        <i-col span="2">
                            <Dropdown style="line-height: 60px; color: #464c5b" @on-click="onDropdownClick">
                                <a href="javascript:void(0)">
                                    {{user.username}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="personInfo">个人信息</DropdownItem>
                                    <DropdownItem name="logout">注销</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                    </Row>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem v-for="(bc, index) in breadcrumbs" :href="index != (breadcrumbs.length - 1) ? '#' : ''" >{{bc}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    API ADMIN SYSTEM
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                height : 0,
                width : 0,
                activeName : '',
                openNames : [],
                menus : null,
                menuMap : {},
                user : this.$store.state.userInfo
            }
        },
        watch : {
            height(to, from) {
            },
            '$route'(to, from) {
            }
        },
        mounted() {
              var gen = (parentId, menus) => {
                    for(let i = 0; i < menus.length; i++) {
                        let item = menus[i];
                        if(!!parentId) {
                            item['uuid'] = parentId + '-' + i;
                        } else {
                            item['uuid'] = i + '';
                        }
                        this.menuMap[item['uuid']] = item;
                        if(!!item.subMenus) {
                            gen(item['uuid'], item.subMenus);
                        }
                    }
              };

              this.menus = this.$store.state.menus;
              gen(null, this.menus);

              var that = this;
              this.height = window.innerHeight;
              this.width = window.innerWidth;
              document.querySelector('.layout-menu-left').style.height = this.height + 'px';
              window.onresize = function(e) {
                  that.height = window.innerHeight;
                  that.width = window.innerWidth;
              }
              var contentDom = document.getElementsByClassName('layout-content')[0];
              contentDom.style.height = (window.innerHeight - 100) + 'px';

        },
        computed: {
            iconSize() {
                return this.spanLeft === 5 ? 14 : 24;
            },
            // 导航条
            breadcrumbs() {
                if(!!this.menus && this.activeName != '') {
                    var arr = (this.activeName + '').split('-');
                    var tArr = [];
                    var tObj = this.menus;
                    for(var i = 0; i < arr.length; i++) {
                        if(i == 0) {
                            tObj = tObj[parseInt(arr[i])];
                        } else {
                            tObj = tObj.subMenus[parseInt(arr[i])];
                        }
                        tArr.push(tObj.text);
                    }
                    return tArr;
                }
                return [''];
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            onSelectChange(name) {
                if(this.spanLeft < 5 || this.activeName === name) {
                    return;
                }
                this.activeName = name;
                this.$router.push({path : this.menuMap[name].url});
                console.log('active name: ' + name);
            },
            onDropdownClick(name) {
                if(name == 'personInfo') {

                } else if(name == 'logout') {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确认注销登陆状态吗?</p>',
                        loading: true,
                        onOk: () => {
                            this.axios.post('/logout').then(r => {
                                if(r.isOk()) {
                                    this.$Modal.remove();
                                    this.$router.push({path : '/login'});
                                }
                            });
                        }
                    });

                }
            }
        }
    }
</script>
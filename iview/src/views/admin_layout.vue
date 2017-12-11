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
        overflow: hidden;
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
</style>
<template>
    <div class="layout" :style="'height:' + height + 'px; width: ' + width + 'px'" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" @on-select="onSelectChange">
                    <div class="layout-logo-left"></div>
                    <template v-if="spanLeft >= 5">
                        <Submenu v-for="(menu, index) in menus" :name="(index + 1) + ''">
                            <template slot="title">
                                <Icon :type="menu.iconClass" :size="iconSize"></Icon>
                                <span class="layout-text">{{menu.text}}</span>
                            </template>
                            <span class="layout-text">
                                <MenuItem v-for="(subMenu, subIndex) in menu.subMenus" :name="(index + 1) + '-' + (subIndex + 1)">{{subMenu.text}}</MenuItem>
                            </span>
                        </Submenu>
                    </template>
                    <template v-else>
                        <!--收缩的时候显示-->
                        <MenuItem  v-for="(menu, index) in menus" :name="index + ''">
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
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                        </i-col>
                        <i-col span="2">
                            <Dropdown style="line-height: 60px; color: #464c5b">
                                <a href="javascript:void(0)">
                                    杨秀初
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>个人信息</DropdownItem>
                                    <DropdownItem>注销</DropdownItem>
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
                    <div class="layout-content-main">Content</div>
                </div>
                <div class="layout-copy">
                    yxc
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
                activeName : '1-1',
                openNames : ['1'],
                menus : [
                    {
                        text : '菜单1',
                        iconClass : 'ios-navigate',
                        subMenus : [
                            {text : '子菜单1-1', url : ''},
                            {text : '子菜单1-2', url : ''}
                        ]
                    },
                    {
                        text : '菜单2',
                        iconClass : 'ios-keypad',
                        subMenus : [
                            {text : '子菜单2-1', url : ''},
                            {text : '子菜单2-2', url : ''}
                        ]
                    }
                ],
            }
        },
        watch : {
            height(to, from) {
            }
        },
        mounted() {
          var that = this;
          this.height = window.innerHeight;
          this.width = window.innerWidth;
          document.querySelector('.layout-menu-left').style.height = this.height + 'px';
          window.onresize = function(e) {
              that.height = window.innerHeight;
              that.width = window.innerWidth;
          }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            // 导航条
            breadcrumbs() {
                if(this.spanLeft < 5) {
                    return ['', ''];
                }
                var arr = this.activeName.split('-');
                var level1 = parseInt(arr[0]);
                var level2 = parseInt(arr[1]);
                return [this.menus[level1-1]['text'], this.menus[level1-1]['subMenus'][level2-1]['text']];
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
            onSelectChange : function(name) {
                if(this.spanLeft < 5) {
                    return;
                }
                this.activeName = name;
            }
        }
    }
</script>
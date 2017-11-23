/*存储菜单信息*/

// 菜单信息
const menuArr = [
    { id:1, pId:0, name:'基本组件', open:true},
    { id:11, pId:1, name:'表格', to : '/base/table'},
    { id:12, pId:1, name:'表单', to : '/base/form'},
];

// 用户信息
const userArr = [
    {id : 1, username : 'yangxiuchu', nickname : '杨秀初', password : '123456'}
];

// 消息提示框配置
Toastr.options = {
    closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: "toast-bottom-full-width",
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

// 配置全局常量.
const global = {
    userKey : 'session',
};

const mockBasePath = 'http://mock.example/api/v1';

export {
    menuArr,
    userArr,
    global,
    mockBasePath
};
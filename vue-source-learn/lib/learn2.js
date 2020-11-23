class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb;
        this.vm = vm;

        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;
        /*Github:https://github.com/answershuto*/
        /*触发渲染操作进行依赖收集*/
        this.cb.call(this.vm);
    }

    update () {
        this.cb.call(this.vm);
    }
}

class Dep {
    constructor () {
        this.subs = [];
    }

    /**
     * 添加依赖
     * @param {Watcher} sub 
     */
    addSub (sub) {
        this.subs.push(sub)
    }

    /**
     * 删除依赖
     * @param {Watcher} sub 
     */
    removeSub (sub) {
        remove(this.subs, sub)
    }

    /*Github:https://github.com/answershuto*/
    notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function observe(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive (obj, key, val, cb) {
    /*在闭包内存储一个Dep对象*/
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (Dep.target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(Dep.target);
            }
        },
        set: newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data, options.render);
        let watcher = new Watcher(this, null, options.render);
    }
}

let vm = new Vue({
    el: '#app',
    data: {
        text: 'aaa',
        text2: 1
    },
    render () {
        console.log('begin render')
    }
})

// 创建依赖
// let t = vm._data.text
// let t2 = vm._data.text2

setTimeout(() => {
    console.log('修改 text')
    vm._data.text = 'ccc'
}, 3000);

setTimeout(() => {
    console.log('修改 text2')
    vm._data.text2 = 2
}, 6000);
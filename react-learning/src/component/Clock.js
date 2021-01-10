import Moment from 'moment';
import React, { Component, useMemo, useState } from 'react';

/**
 * state 的更新不能直接修改, 必须使用 setState 方法.
 */
class Clock extends Component {
    constructor(props) {
        super(props);
        this.initOrRefersh();
    }

    // 相当于 Vue.mounted
    componentDidMount() {
        this.timerID = setInterval(() => {
            if (!this.suspend) {
                this.initOrRefersh(false);
            }
        }, 1000);
    }

    // 相当于 Vue.beforDestory
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // 使用箭头函数, 
    handleClick = (e) => {
        this.setState({ suspend: !this.state.suspend });
        e.preventDefault();
    }

    // 调用普通函数需要绑定 this, 否则函数内的 this 不会指向当前 class 实例.
    handleClick2(e) {
        this.setState({ suspend: !this.state.suspend });
        e.preventDefault();
    }

    initOrRefersh(isInit = true) {
        let datetime = Moment().format('YYYY-MM-DD HH:mm:ss');

        if (isInit) {
            let suspend = false
            this.state = { datetime, suspend };
        } else {
            // 会与原来的 state 进行合并
            if (!this.state.suspend) {
                this.setState({ datetime });
            }
        }
    }

    // 一个简单的计算属性（无缓存功能）
    get ClockStyle() {
        return {
            cursor: 'pointer',
            color: this.state.suspend ? '#EEEEEE' : '#000000'
        }
    }

    render() {
        return <div>
            <h1 style={this.ClockStyle} onClick={this.handleClick2.bind(this)}>{this.state.datetime}</h1>
            <button onClick={this.handleClick2.bind(this)}>{this.state.suspend ? '继续' : '暂停'}</button>
        </div>
    }
}

export default Clock;
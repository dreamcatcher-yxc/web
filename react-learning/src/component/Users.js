// import Moment from 'moment';
import React, { Component } from 'react';

/**
 * state 的更新不能直接修改, 必须使用 setState 方法.
 */
class Users extends Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        let users = [];

        for(let i = 0; i < 10; i++) {
            let id = i + 1;
            let name = id;
            let age = id;
            let gender = id % 2 === 0 ? '男' : '女';
            users.push({id, name, age, gender});
        }

        this.state = {users};
    }

    // 相当于 Vue.mounted
    componentDidMount() {

    }

    // 相当于 Vue.beforDestory
    componentWillUnmount() {
    }

    render() {
        let trs = this.state.users.map((item, index) => {
            return (
                <tr key={index}>
                    <td align="center">{ item.id }</td>
                    <td align="center">{ item.name }</td>
                    <td align="center">{ item.age }</td>
                    <td align="center">{ item.gender }</td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                    </tr>
                </thead>
                <tbody>
                    { trs }
                </tbody>
            </table>
        );
    }
}

export default Users;
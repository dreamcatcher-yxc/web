import React from 'react'
import MyContext from './MyContext'

class MyComp extends React.Component {
    
    // 指定类级别的 contextType, 之后程序就知道 this.context 的类型是什么了
    static contextType = MyContext

    constructor(props) {
      super(props);
    }

    render() {
      return <h1>{ this.context.message }</h1>
    }
}

export default MyComp
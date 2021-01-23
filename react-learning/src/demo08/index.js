import React from 'react'
import createReactClass from 'create-react-class'
import ReactDOM from 'react-dom'

const App = createReactClass({
  // 相当于 ES6 class 下的 [ComponentName].defaultProps
  getDefaultProps: function () {
    return {
      name: 'React'
    }
  },

  // 相当于 this.state
  getInitialState: function () {
    return {
      count: 0
    }
  },

  // 使用 ES5 的 crateReactClass 方式创建的 class，其中的 this 自动指定当前的组件，
  // 不需要创建的绑定
  handleClick () {
    console.log(this)
  },

  render: function () {
    return (
      <>
        <h1>Hello, { this.props.name }</h1>
        <h1>Count: { this.state.count }</h1>
        <button onClick={ this.handleClick }>Click</button>
      </>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

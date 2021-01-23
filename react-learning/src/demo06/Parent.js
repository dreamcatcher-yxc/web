import React from 'react'
import Modal from './Modal'
import Child from './Child'

class Parent extends React.Component {
  constructor (props) {
    super(props)
    this.state = { clicks: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState(state => ({
      clicks: state.clicks + 1
    }))
  }

  render () {
    return (
      <div onClick={ this.handleClick } >
        <p>Number of Clicks: { this.state.clicks }</p>
        <p>
          打开开发者工具审查元素可以发现，&lt;button&gt; 按钮并不是 &lt;div#root&gt; 的子元素。
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    )
  }
}

export default Parent
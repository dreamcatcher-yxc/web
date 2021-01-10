import React from 'react'
import ReactDOM from 'react-dom'
import MyComp from './MyComp'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.titleRef = React.createRef()
    this.changeColor = this.changeColor.bind(this)
    this.changeChildColor = this.changeChildColor.bind(this)
  }

  changeColor () {
    let el = this.ref.current
    let currentColor = el.style.color
    el.style.color = currentColor === 'red' ? 'green' : 'red'
  }

  changeChildColor () {
    let el = this.titleRef.current
    let currentColor = el.style.color
    el.style.color = currentColor === 'red' ? 'green' : 'red'
  }

  componentDidMount () {
    console.log('组件加载完成...')
    console.log(this.titleRef)
  }

  render () {
    return (
      <div>
        <h1 ref={ this.ref }>demo03</h1>
        <MyComp titleRef={ this.titleRef } />
        <button onClick={ this.changeColor }>更改标题颜色</button>
        &nbsp;&nbsp;
        <button onClick={ this.changeChildColor }>更改子组件标题颜色</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
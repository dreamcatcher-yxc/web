import React from 'react'
import ReactDOM from 'react-dom'
import logProps from './logProps'
import MyComp from './MyComp'

const MyComp2 = logProps(MyComp)

class App extends React.Component {

  constructor (props) {
    super(props)
    // 创建一个 ref
    this.ref = React.createRef()
    this.titleRef = React.createRef()
    this.titleRef2 = React.createRef()
    this.changeColor = this.changeColor.bind(this)
    this.changeChildColor = this.changeChildColor.bind(this)
  }

  changeColor () {
    // 获取 ref 当前指向的 dom 对象
    let el = this.ref.current
    let currentColor = el.style.color
    el.style.color = currentColor === 'red' ? 'green' : 'red'
  }

  changeChildColor (titleRef) {
    let el = titleRef.current
    let currentColor = el.style.color
    el.style.color = currentColor === 'red' ? 'green' : 'red'
  }

  componentDidMount () {
    console.log('组件加载完成...')
    // console.log(this.titleRef)
  }

  render () {
    return (
      <div>
        <h1 ref={ this.ref }>demo03</h1>
        <MyComp titleRef={ this.titleRef } />
        <MyComp2 ref={ this.titleRef2 } />
        <button onClick={ this.changeColor }>更改标题颜色</button>
        &nbsp;&nbsp;
        <button onClick={ () => this.changeChildColor(this.titleRef) }>更改子组件标题颜色</button>
        <button onClick={ () => this.changeChildColor(this.titleRef2) }>更改子组件2标题颜色</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
import React from 'react'

class Mouse extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseMove (event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render () {
    return (
      <div
        style={ { width: '100%', height: '250px', border: '1px solid red' } }
        onMouseMove={ this.handleMouseMove }
      >
        {/*
          props.render 代表的是一个渲染函数
        */}
        { this.props.render(this.state) }
      </div>
    )
  }
}

export default Mouse
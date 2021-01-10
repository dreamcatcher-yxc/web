import React from 'react'

class MyComp extends React.Component {
  
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log(this.props.titleRef)
  }

  render () {
    return (
      <div className="my-comp">
        <h1 ref={ this.props.titleRef }>my component</h1>
      </div>
    )
  }

}

export default MyComp
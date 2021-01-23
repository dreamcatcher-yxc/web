import React from 'react'

class Child extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="modal">
        <button>Click</button>
      </div>
    )
  }
}

export default Child
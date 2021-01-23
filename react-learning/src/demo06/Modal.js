import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.el= document.createElement('div')
    this.modalRootEl = document.getElementById('modal-root')
  }

  componentDidMount () {
    this.modalRootEl.appendChild(this.el)
  }

  componentWillUnmount () {
    this.modalRootEl.removeChild(this.el)
    this.modalRootEl = null
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

export default Modal
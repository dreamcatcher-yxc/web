import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '--' }
    this.handleSbumit = this.handleSbumit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.fileRef = React.createRef()
  }

  handleFileChange () {
    let name = this.fileRef.current.files[0].name
    this.setState({ name })
  }

  handleSbumit (event) {
    return event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={ this.handleSbumit }>
        请选择文件：
        <input
          type="file"
          ref={ this.fileRef }
          onChange={ this.handleFileChange }
        />
        文件名称：{ this.state.name }
        <br />
        <input type="submit" value="提交" />
      </form>  
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'))

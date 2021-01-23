import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  createMarkup() {
    /* key 必须为 __html（用于警告这是直接通过 innerHTML 设置的内容 */
    return {__html: '<font color="red">hello react</font>' }
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={ this.createMarkup() }>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'))

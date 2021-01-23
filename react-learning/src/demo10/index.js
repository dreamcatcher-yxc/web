import React from 'react'
import ReactDOM from 'react-dom'
import Mouse from './Mouse'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Mouse
        render={ (mouse) => {
            return <p>x: { mouse.x }, y: { mouse.y } </p>
          }
        }
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react'
import ReactDOM from 'react-dom'

function Hello (props) {
  return React.createElement('h1', null, `hello, ${ props.name }`)
}

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement(Hello, { name: 'react' })
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

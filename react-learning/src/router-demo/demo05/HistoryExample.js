import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import ReactDOM from 'react-dom'

class Comp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1
    }
    this.addCount = this.addCount.bind(this)
  }

  addCount () {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged =
      this.props.location !== prevProps.location

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged2 =
      this.props.history.location !== prevProps.history.location

    console.log(locationChanged, locationChanged2)
  }

  render () {
    return (
      <>
        <h1>count: { this.state.count }</h1>
        <button onClick={ this.addCount }>add count</button>
      </>
    )
  }
}

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Comp</Link>
            </li>
            <li>
              <Link to="/1">1</Link>
            </li>
            <li>
              <Link to="/2">2</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" component={ Comp }>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
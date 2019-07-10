import React from 'react'
import ReactDOM from 'react-dom'
import createReactClass from 'create-react-class'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

const App = createReactClass({
    render() {
        return (
            <div>
                <h2>welcome use react-router</h2>
                <ul>
                  <li>
                    <Link to={ "/foo1" }>foo1</Link>
                  </li>
                  <li>
                    <Link to={ "/foo2" }>foo2</Link>
                  </li>
                </ul>
            </div>
        )
    }
})

const Nav = createReactClass({
  render() {
    return (
      <div>
        { this.props.match.path }
      </div>
    )
  }
})

// 路由配置说明（你不用加载整个配置，
// 只需加载一个你想要的根路由，
// 也可以延迟加载这个配置）。
export const run = () => {
  ReactDOM.render((
    <main>
      <BrowserRouter>
          <App />
          <Route path="/foo1" component={ Nav }>
          </Route>
          <Route path="/foo2" component={ Nav }>
          </Route>
      </BrowserRouter>
    </main>
    )
  , document.getElementById('root'))
}

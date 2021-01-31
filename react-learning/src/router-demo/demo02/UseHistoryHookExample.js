import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Users () {
  return <h2>Users</h2>
}

/**
 * 使用 useHistory 访问路由历史，从而进行编程式导航
 */
function HomeButton () {
  let history = useHistory()

  function handleClick () {
    history.push('/home')
  }

  return (
    <button type="button" onClick={ handleClick }>
      Go Home
    </button>
  )
}

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <HomeButton />
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/users">users</Link>
            </li>
          </ul>
        </nav>

        {/* 
          <Swith> 会按照顺序匹配当前 URL 匹配 Route，Route.path 匹配当前 url，则该 Route 的子元素将会被渲染
        */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
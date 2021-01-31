import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Users () {
  // 使用 useParams 获取传递的参数
  let { userId } = useParams()
  return <h2>User ID: { userId || 'unkonow userId'  } </h2>
}

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/users">users</Link>
            </li>
            <li>
              <Link to="/users/1">users/1</Link>
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
          {/* :userId? 表示 userId 可以不用传递，否则如果直接访问 /Users，则不能匹配到此路由 */}
          <Route path="/users/:userId?">
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
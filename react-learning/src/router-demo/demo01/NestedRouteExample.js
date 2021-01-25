import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Topic () {
  let { topicId } = useParams()
  return <h3>主题ID：{ topicId }</h3>
}

/**
 * 该组件可以看作 /topics 路径匹配的根组件
 */
function Topics () {
  let match = useRouteMatch()
  
  /* match.url 表示访问当前子组件的根路径 */
  return (
    <div>
      <h2>主题列表</h2>
      <ul>
        <li>
          <Link to={ `${match.url}/foo1` }>foo1</Link>
        </li>
        <li>
          <Link to={ `${match.url}/foo2` }>foo2</Link>
        </li>
      </ul>

      <Switch>
        <Route path={ `${match.path}/:topicId` }>
          <Topic />
        </Route>
        <Route path={ match.path }>
          <h3>请选择主题</h3>
        </Route>
      </Switch>
    </div>
  )
}

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">主页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="/topics">主题列表</Link>
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
          <Route path="/topics">
            <Topics />
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
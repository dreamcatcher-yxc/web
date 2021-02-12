import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Users (props) {
  let { search } = props.location
  let { state } = props.location
  let stateInfo = null
  if (state) {
    stateInfo = <h2>state: { state.foo || '--' }</h2>
  } else {
    stateInfo = <h2>not state information...</h2>
  }

  return (
    <>
      <h2>User ID: { search }</h2>
      { stateInfo }
    </>
  )
}

// 将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
const UsersRoute = withRouter(Users)

function App () {
  let usersLinkRef = React.createRef()
  let isLogged = true

  useEffect(() => {
    // usersLinkRef.current 指向 <Link to="/users?userId=1" innerRef={ usersLinkRef } >users(userId=1)</Link> 创建的 <a> 标签的 DOM 引用
    console.log(usersLinkRef.current)
  })

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/users?userId=1" innerRef={ usersLinkRef } >users(userId=1)</Link>
            </li>
            <li>
              {/* replace 表示点击路由之后将会替换掉最新访问地址历史 */}
              <Link
                to={
                  {
                    pathname: '/users',
                    search: '?userId=2'
                  }
                } 
                replace
              >
                users(userId=2)
              </Link>
            </li>
            <li>
              {/* to 允许使用 function, 接受一个 locaiton 参数 */}
              <Link
                to={ location => (
                    {
                      ...location,
                      pathname: '/users',
                      search: '?userId=3'
                    }
                  )
                }
              >
                users(userId=3)
              </Link>
            </li>
            <li>
              <Link to="/users?userId=4">users(userId=4)</Link>
            </li>
            <li>
              <Link to="/users1">/users1</Link>
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
            <UsersRoute />
          </Route>
          {/* 当前路径匹配 /user1/**  的时候，会跳转到 /users2 */}
          <Redirect from="/users1" to="/users2" />
          <Route path="/users2">
            <UsersRoute />
          </Route>
          <Route path="/">
            { 
              isLogged ? 
              <Redirect to={
                {
                  pathname: '/users',
                  search: '?userId=test',
                  state: { foo: 'hello world!' }
                }
              } /> 
              : 
              <Home /> 
            }
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
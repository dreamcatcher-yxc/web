import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
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
 * 用于监听当前路由地址的变化，（ userLocation 需要在 <Router> 标签里面使用, location.key 标识当前路由的唯一标识，默认为 6 位
 */
function UsePageViews () {
  let location = useLocation()
  useEffect(() => {
    console.log('当前访问路由地址：', location.pathname, '(', location.key, ')')
  }, [location.pathname])
  return null
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

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition); // 回调询问结果
}


/*
 *  BrowserRouter.basename 表示基础路由地址，如下：则 /about 会被转换为 /test/about
 *  BrowserRouter.getUserConfirmation 表示进入路由之前的回调
 *  BrowserRouter.forceRefresh 是否每次进入新路由的时候都强制刷新页面（通常用在服务器渲染或者不支持 HTML5 history API 的浏览器）
 */
function App () {
  return (
    <BrowserRouter
      basename="/test"
      // getUserConfirmation={ getConfirmation('确定吗？', ok => {
      // }) }
      // forceRefresh={ true }
      keyLength={ 10 }
    >
      <UsePageViews />
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
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
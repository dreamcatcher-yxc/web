import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function App () {
  /*  NavLink.activeClassName 表示当前路由地址和当前链接能够匹配成功，在该链接上天添加的 className */
  /*  NavLink.activeStyle 表示当前路由地址和当前链接能够匹配成功，在该链接上天添加的 style 样式 */
  /*  NavLink.exact 表示当前路由地址和当前链接能够完全匹配成功，才会应用 activeClassName|activeStyle */
  /*  NavLink.isActive 一种添加额外逻辑以确定链接是否处于活动状态的功能。如果您要执行更多操作，而不是验证链接的路径名是否与当前URL的匹配，则应使用此选项pathname。 */
  let navLinkCommonProps = {
    activeClassName: 'red-border',
    activeStyle: {
      color: 'green'
    },
    // exact: true,
    // isActive: (match, location) => {
    //   if (!match) {
    //     return false
    //   }
  
    //   // only consider an event active if its event id is an odd number
    //   console.log(match)
    //   const eventID = parseInt(match.params.eventID)
    //   return !isNaN(eventID) && eventID % 2 === 1
    // }
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/home" { ...navLinkCommonProps }>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" { ...navLinkCommonProps }>about</NavLink>
            </li>
          </ul>
        </nav>

        {/* 
          <Swith> 会按照顺序匹配当前 URL 匹配 Route，Route.path 匹配当前 url，则该 Route 的子元素将会被渲染
        */}
        <Switch>
          <Route path="/home">
            <About />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            main page
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
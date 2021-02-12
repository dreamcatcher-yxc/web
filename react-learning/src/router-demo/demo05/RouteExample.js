import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About (props) {
  let [ count, setCount ] = useState(1)

  return (
    <>
      <h2>About, count is: { count }</h2>
      <button onClick={ () => setCount(count + 1) }>add count</button>
    </>
  )
}

function About2 (props) {
  let [ count, setCount ] = useState(1)

  return (
    <>
      <h2>About2, count is: { count }</h2>
      <button onClick={ () => setCount(count + 1) }>add count</button>
    </>
  )
}

function Users (props) {
  let { search } = props.location
  return <h2>User ID: { search }</h2>
}

// 将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
const UsersRoute = withRouter(Users)

function App () {
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
              <Link to="/about2">about2</Link>
            </li>
            <li>
              <Link to="/about3">about3</Link>
            </li>
            <li>
              <Link to="/users?userId=1">users(userId=1)</Link>
            </li>
            <li>
              <Link to="/users1?userId=11">users1(userId=11)</Link>
            </li>
            <li>
              <Link to="/users2?userId=12">users2(userId=12)</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {/* 
            可以使用 component 属性传递路由匹配时渲染的组件，此时该路由相关属性将会自动关联该组件：
            match, location, history
            
          */}
          <Route path="/about" component={ About } />
          {/* 
            component 传递内联函数创建组件时，会导致现有的组件卸载，新组件创建， 所以需要使用 render 或者 child 方式替代
            component 属性优先于 render 属性，不要两个属性同时使用
          */}
          <Route path="/about2" render={ () => (<About2 />) } />
          {/* children 优先级最多高，不要和 component、render 混用 */}
          <Route
            path="/about3"
            children={
              ({ match }) => {
                return <h1>{ match ? '匹配' : '不匹配' }</h1>
              }
            } 
          />
          <Route path="/users">
            <UsersRoute />
          </Route>
          {/* path 支持使用数组传递多个路径配置 */}
          <Route path={ ['/users1', '/users2'] }>
            <UsersRoute />
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
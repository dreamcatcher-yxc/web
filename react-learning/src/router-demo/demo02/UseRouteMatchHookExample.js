import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom'

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Users (props) {
  let { userId } = props
  return <h2>User ID: { userId || 'unkonow userId'  } </h2>
}

/* 
const match = useRouteMatch({
  path: "/BLOG/:slug/",
  strict: true,
  sensitive: true
});
*/
function NavPage () {
  /* 泛型匹配 */
  let match = useRouteMatch('/:path?/:userId?')
  let { path, userId } = match.params
  
  if(path === 'home') {
    return <Home />
  }
  
  if(path === 'about') {
    return <About />
  }

  if(path === 'users') {
    return <Users userId={ userId } />
  }

  return <h1>Index Page</h1>
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

        <Switch>
          <Route path="/">
            <NavPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
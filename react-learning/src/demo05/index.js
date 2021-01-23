import React from 'react'
import ReactDOM from 'react-dom'

function LiListView (props) {
  let list = props.list
  return (list.map(val => (<h1>{ val }</h1>)))
}

function App () {
  return (
    <ul>
      <LiListView  list={ [1, 2, 3, 4] } />
    </ul>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
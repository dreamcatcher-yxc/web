import React, { useState } from 'react'
import { generatePath } from 'react-router'
import ReactDOM from 'react-dom'

function App () {
  let path = generatePath("/user/:id/:entity(posts|comments)", {
    id: 1,
    entity: "posts"
  })
  // TypeError: Expected "entity" to be defined
  // let path2 = generatePath("/user/:id/:entity(posts|comments)", { id: 1 })

  return (
    <>
      <h1>{ path }</h1>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
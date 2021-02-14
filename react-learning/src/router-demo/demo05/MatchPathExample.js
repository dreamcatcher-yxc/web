import React, { useState } from 'react'
import { matchPath } from 'react-router'
import ReactDOM from 'react-dom'

function App () {
  let metaInfo = matchPath("/users/2", {
    path: "/users/:id",
    exact: true,
    strict: true
  })

  if (!metaInfo) {
    return <h1>无匹配信息</h1>
  }

  // console.log(matched)
  let matchInfos = Object.keys(metaInfo).map(key => {
    let val = metaInfo[key]
    if(typeof val === 'object') {
      return {
        key,
        value: JSON.stringify(val)
      }
    }
    return {
      key,
      value: new String(val)
    }
  })
  .map(({key, value}, inx) => {
    return (
      <li key={ inx }>{ key }: { value }</li>
    )
  })

  return (
    <>
      <fieldset>
        <legend>匹配信息</legend>
        <ul>
          { matchInfos }
        </ul>
      </fieldset>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
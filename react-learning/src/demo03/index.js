import React from 'react'
import ReactDOM from 'react-dom'
import MyContext from './MyContext'
import MyComp from './MyComp'
import MyComp2 from './MyComp2'

let changed = false

function App() {
  // 使用 state 实现作为 Provider 的属性值，实现 Dynamic Context
  const [contextValue, setContextValue] = React.useState({
    message: 'hello world!'
  })

  if (!changed) {
    setTimeout(() => {
      console.log('变化')
      changed = true
      setContextValue({
        message: 'hello react...'
      })
    }, 1000)
  }

  return (
    <div>
      new value: <input value={ contextValue.message } onChange={ (e) => setContextValue({ message: e.target.value }) } />
      <MyContext.Provider value={contextValue}>
        <div>
          <MyComp />
        </div>
      </MyContext.Provider>
      {/* 此组件因为没有提供值，则使用默认值 */}
      <MyComp2 />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


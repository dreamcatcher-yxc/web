import React, { useState, useEffect } from 'react'

function Counter (props) {
  // 类似于 Vue3 中的 Composition API，允许在初始化阶段创建组件的子逻辑
  // 直接使用 useState 创建 state
  let [count, setCount ] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `您点击了【${ count }】次按钮`
  })

  return (
    <div>
      <p>您点击了【{ count }】次按钮</p>
      <button onClick={ () => setCount(count + 1) }>点击</button>
    </div>
  )
}

export default Counter
import React, { useState, useEffect } from 'react'

function FriendStatus (props) {
  let [isOnline, setInOnline ] = useState(false)

  function handleStatusChange (status) {
    setInOnline(status.isOnline)
  }
  
  // useEffect 第二个参数代表外部作用域会变化，而 effect 内部需要使用到的变量
  // 由于 useEffect 在组件每次渲染的时候都会调动，但是如果传入的第二个值没有变化，
  // 则 useEffect 内部的函数不会在下次渲染的时候执行，如果我们需要 useEffect 里面
  // 的内容只执行一次，而且不依赖外部的值的变化，第二个参数可以传递空数组达到这样的
  // 效果。
  useEffect(() => {
    let handler = setInterval(() => {
      handleStatusChange({ isOnline: Math.random() > 0.5 })
    }, 1000)
    console.log('开始轮询...')
    
    return () => {
      clearInterval(handler)
      console.log('停止轮询...')
    }
  }, [])

  return isOnline ? '在线' : '下线'
}

export default FriendStatus
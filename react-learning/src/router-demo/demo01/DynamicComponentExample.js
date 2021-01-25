import React from 'react'
import ReactDOM from 'react-dom'
import loadable from '@loadable/component'

function Loading() {
  return (<h3>loading...</h3>)
}

// 模拟网络延迟，1.5S 之后组件才加载成功
const LazyDashboard = import('./Dashboard')
  .then(comp => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(comp);
      }, 1500);
    });
  })

// 懒加载组件
const LoadableComponent = loadable(() => LazyDashboard, {
  fallback: <Loading />
})

ReactDOM.render(<LoadableComponent />, document.getElementById('root'))
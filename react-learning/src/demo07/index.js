import React, { Profiler } from 'react'
import ReactDOM from 'react-dom'
import ListView from './ListView'

function App () {
  const [ list, setList ] = React.useState([
    { value: 1, label: 'label-1' },
    { value: 2, label: 'label-2' },
    { value: 3, label: 'label-3' }
  ])

  function changeList () {
    setList([
      ...list,
      { value: list.length + 1, label: `label-${list.length + 1}` }
    ])
  }

  function deleteRow (inx) {
    setList(list.filter((val, inx2) => inx !== inx2))
  }

  function listViewRenderCallback (
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合) {
  ) {
    console.log('id: ', id)
    console.log('phase: ', phase)
    console.log('actualDuration: ', actualDuration)
    console.log('baseDuration: ', baseDuration)
    console.log('startTime: ', startTime)
    console.log('commitTime: ', commitTime)
    console.log('interactions: ', interactions)
  }

  return (
    <>
      <Profiler id="ListView" onRender={ listViewRenderCallback }>
        <ListView list={ list } deleteRow={ deleteRow } />
      </Profiler>
      <button onClick={ changeList }>click</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

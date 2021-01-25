import React, { useState, useEffect } from 'react'
import FriendStatus from './FriendStatus'

function UserInfo (props) {
  let [ count, setCount ] = useState(0)

  let FriendInfo
  if(count % 2 === 0) {
    FriendInfo = <div><FriendStatus /></div>
  } else {
    FriendInfo = <div>已销毁</div>
  }

  console.log('count: ', count)

  return (
    <div>
      {FriendInfo}
      <br/>
      <button onClick={ () => setCount(count + 1) }>{ count % 2 === 0 ? '销毁' : '创建' }</button>
    </div>
  )
}

export default UserInfo
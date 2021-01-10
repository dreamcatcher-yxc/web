import React from 'react'
import MyContext from './MyContext'

class MyComp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <MyContext.Consumer>
      {
        (val) => {
          return <h1>{val.message}</h1>
        }
      }
    </MyContext.Consumer>
  }
}

export default MyComp
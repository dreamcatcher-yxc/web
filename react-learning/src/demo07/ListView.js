import React from 'react'

class ListView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { deleteRow } = this.props

    return (
      <ul>
        { this.props.list.map(({label, value}, inx) => {
            let anchor = <a href="#" onClick={ () => deleteRow(inx) }>删除</a>
            return (<li key={ value }>{ label } { anchor }</li>)
         }) 
        }
      </ul>
    )
  }
}

export default ListView
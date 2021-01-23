import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.renderAddress = this.renderAddress.bind(this)
  }

  renderAddress (address) {
    let { country, province, city, county, town, village } = address
    return `${country}${province}省${city}市${county}县${town}镇${village}村`
  }

  render () {
    return (
      <ul>
        <li>姓名: { this.props.name }</li>
        <li>年龄: { this.props.age }</li>
        <li>性别: { this.props.gender }</li>
        <li>喜好: { this.props.likes.join('、') }</li>
        <li>地址: { this.renderAddress(this.props.address) }
        </li>
      </ul>
    )
  }
}

// 指定属性
App.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  address: PropTypes.shape({
    country: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    village: PropTypes.string.isRequired,
  }).isRequired
}

// 默认 Props
App.defaultProps = {
  name: 'xxx' // 这里指定了 name 默认为 'xxx'，则 name 属性虽然是必填的，但是可以不用传递
}


let props = {
  name: '张三',
  age: 20,
  gender: '男',
  likes: [ '动漫', '健身', '编程' ],
  address: {
    country: '中国',
    province: '浙江',
    city: '杭州',
    county: 'xx',
    town: 'xx',
    village: 'xx'
  }
}

ReactDOM.render(<App { ...props } />, document.getElementById('root'))

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '--' }
    this.handleSbumit = this.handleSbumit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.fileRef = React.createRef()
    this.imgRef = React.createRef()
  }

  handleFileChange () {
    const file = this.fileRef.current.files[0];
    //判断file的类型是不是图片类型。
    if (!/image\/\w+/.test(file.type)) {
      alert("文件必须为图片！");
      return false;
    }

    const reader = new FileReader() //声明一个FileReader实例
    reader.readAsDataURL(file) //调用readAsDataURL方法来读取选中的图像文件
    //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
    reader.onload = (e) => {
      this.imgRef.current.setAttribute('src', reader.result)
    }
    this.setState({ name: file.name })
  }

  handleSbumit (event) {
    return event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSbumit}>
        请选择文件：
        <input
          type="file"
          ref={this.fileRef}
          onChange={this.handleFileChange}
        />
        文件名称：{this.state.name}
        <br />
        <input type="submit" value="提交" />
        <br />
        <br />
        <img style={{ width: '300px', height: '198.66px' }} ref={this.imgRef} />
      </form>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Clock from './component/Clock';
import Users from './component/Users';
import { YInput } from './component/FormItems';
import Calculator from './component/Calculator';
import FilterableProductTable from './component/demo/FilterableProductTable'
import './index.css';

// 实现每隔一秒渲染一次
// setInterval(() => {
//   ReactDOM.render(
//     <div>{ new Date().toLocaleTimeString() }</div>,
//     document.getElementById('root')
//   );
// }, 1000);

// 函数式组件

function Welcome(props) {
  return <h1>hello, {props.name}</h1>;
} 

// 复合组件
function MyApp() {
    return <div>
      <Welcome name="张三"></Welcome>
      <Welcome name="李四"></Welcome>
      <Welcome name="王五"></Welcome>
    </div>
}

const element = <Welcome name="xiuchu.yang"></Welcome>

// ReactDOM.render(
//   <div>
//     <form action="#" method="post">
//       <YInput name="username" value="xiuchu.yang" placeholder="用户名" />
//     </form>
//     <hr />
//     <Calculator></Calculator>
//     <hr />
//     <FilterProductTable />
//   </div>,
//   document.getElementById('root')
// );


ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
);


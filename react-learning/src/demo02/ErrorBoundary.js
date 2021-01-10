import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    /**
     * 处理异常情况
     * @param {} error 
     */
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>加载出错了...</h1>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;
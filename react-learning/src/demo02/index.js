import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import MyErrorBounday from './ErrorBoundary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 正常导入
// const LazyComp = React.lazy(() => import('./LazyComp'));

// 模拟网络延迟，1.5S 之后组件才加载成功
const LazyComp2 = import('./LazyComp')
    .then(comp => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(comp);
            }, 1500);
        });
    })
const LazyComp = React.lazy(() => LazyComp2);

const LoadingErrorComp = React.lazy(() => Promise.reject('加载出错...'));

ReactDOM.render(
    <div>
        <a href="./ok">异步组件加载示例</a>
        &nbsp;&nbsp;
        <a href="./error">错误边界处理示例</a>
        <MyErrorBounday>
            <Router>
                <Suspense fallback={ <div> loading... </div> }>
                    <Switch>
                        <Route exact path="/ok" component={LazyComp}/>
                        <Route exact path="/error" component={LoadingErrorComp}/>
                    </Switch>
                </Suspense>
            </Router>
        </MyErrorBounday>
    </div>,
    document.getElementById('root')
);
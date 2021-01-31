## 说明
 一些 react-router 各种不同的 XXXRouter 导航方式

## 文件目录说明

- `BrowserRouterExample`: 正常 URL 地址路由
- `HashRouterExample`: Hash URL 地址路由
  - hashType：字符串
    
    > 用于的编码类型window.location.hash。可用值为：

    - "slash"-产生像#/和#/sunshine/lollipops
    - "noslash"-产生像#和#sunshine/lollipops
    - "hashbang"-创建类似于“和”的“可抓取的ajax”哈希（由Google弃用）#!/#!/sunshine/lollipops
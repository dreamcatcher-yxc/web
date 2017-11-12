## 依赖说明
- Sequelize\@3.24.1: node 界的 ORM 框架。
- mysql\@2.11.1: node 数据库连接驱动。
> mysql 仅支持 5.7 版本.

## 结构
- controllers
- mode_modules
- static: 静态文件, devlopment 环境使用
- views: 页面模版文件
- app.js: 项目启动文件
- config.js: 数据路配置
- controller.js: controller 自动配置文件
- db.js: 数据库工具
- init_db.js: 初始化数据库
- static_files.js: 处理静态文件
- templating.js: 前端模版配置文件, 使用 nunjucks
- config.js: 配置数据库相关
- package.json


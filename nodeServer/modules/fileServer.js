/**
 * 文件服务器.
 */
const [fs, http, url,  path, DEFALT_ENCODING] = [require('fs'), require('http'), require('url'), require('path'), 'UTF-8'];
const root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

// 创建服务器:
class FileServer {
    constructor() {
        this.server = http.createServer(function (request, response) {
            // 获得URL的path，类似 '/css/bootstrap.css':
            var pathname = url.parse(request.url).pathname;
            // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
            var filepath = path.join(root, pathname);
            // 获取文件状态:
            fs.stat(filepath, function (err, stats) {
                if (!err && stats.isFile()) {
                    // 没有出错并且文件存在:
                    console.log('200 ' + request.url);
                    // 发送200响应:
                    response.writeHead(200);
                    // 将文件流导向response:
                    fs.createReadStream(filepath, DEFALT_ENCODING).pipe(response);
                } else {
                    // 出错了或者文件不存在:
                    console.log('404 ' + request.url);
                    // 发送404响应:
                    response.writeHead(404);
                    response.end('404 Not Found');
                }
            });
        });
    }
    run(port = 8080) {
        try {
            console.log('FileServer begin startup...');
            this.server.listen(port);
            console.log(`FileServer is running at http://127.0.0.1:${port}/`);
        } catch (e) {
            console.log('服务启动失败!');
            console.log(e);
        }
    }
}

module.exports = FileServer;


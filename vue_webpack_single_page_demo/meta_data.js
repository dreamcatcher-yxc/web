var path = require("path");
var src = path.resolve(__dirname, 'src');
var dist = path.resolve(__dirname, 'dist');
var config = path.resolve(__dirname, 'config');

module.exports = {
    ROOT : __dirname,
    SRC : src,
    DIST : dist,
    CONFIG : config,
    HTML_SRC_ROOT : path.join(src, 'pages'),
    HTML_DIST_ROOT : path.join(dist, 'pages'),
    DEFAULT_ENCODING : 'UTF-8'
}
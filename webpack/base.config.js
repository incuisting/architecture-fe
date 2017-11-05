const path = require('path'); //path 为node核心文件
const entry = require('./entry');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: path.resolve(process.cwd(), "src/app"), //手动配置编译上下文
    entry: entry,
    watch: true,
    output: {
        path: path.resolve(process.cwd(), 'dist'), //process.cwd()启动目录
        filename: "[name].js",
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf|jpeg)$/,
                loader: "file-loader",
                options: {
                    name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title: 'sale',
            filename: 'src/base/webapck.template.html'
        })
    ]

}
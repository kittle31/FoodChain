const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill",'./src/main/js/app/app.js'],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: [path.resolve(__dirname, 'src/main/resources/static')],
        publicPath: '/',
        proxy: {
            '/api/*': {
                //route ui dev-server which is on 8080 requests to the 9090 where backend server runs
                target: 'http://localhost:9090',
                secure: false
            },
            '/': {
                //serve the index.html from the server
                target: 'http://localhost:9090',
                secure: false
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/main/resources/static/index.html")
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, //using regex to tell babel exactly what files to transcompile
                exclude: /node_modules/, // files to be ignored
                use: {
                    loader: 'babel-loader' // specify the loader
                }
            }
        ]
    }
};

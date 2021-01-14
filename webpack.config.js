const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main/js/app/app.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Development',
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

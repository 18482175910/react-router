const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack =require('webpack');

module.exports = {
    entry: {
        app:"./app/index.js",
        vendor:['react','react-dom','react-router-dom']
    },
    output: {
        path: "/dist",
        filename: "[name].[hash:8].bundle.js"
    },
    // devtool:"inline-source-map",
    devtool:"source-map",
    devServer: {
        hot:true,
        inline:true,
        progress:true,
        contentBase: "app",
        host:'localhost',
        port:'8000'
    },
    module:{
        rules: [
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['babel-preset-env','babel-preset-react'],
                        plugins: ["transform-object-rest-spread"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
          }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        })
    ],
    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    }
};
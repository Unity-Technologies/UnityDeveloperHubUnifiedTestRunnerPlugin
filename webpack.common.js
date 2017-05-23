const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.tsx'
    ],
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/,
                use: [
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'awesome-typescript-loader' },
                ],
                include: resolve(__dirname, '../src')
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            // Scss loader for component styles
            {
                test: /\.scss$/,
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                include: resolve(__dirname, '../src/app')
            },

            // Scss loader for global styles
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }],
                exclude: resolve(__dirname, '../src/app')
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};

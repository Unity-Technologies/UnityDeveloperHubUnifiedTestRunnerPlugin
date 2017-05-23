const { resolve } = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const DevConfig = require('./webpack.dev.js');

const devElectronConfig = Merge(DevConfig, {
    output: {
        publicPath: 'http://localhost:8080/',
    },
    target: "electron-renderer"
});

module.exports = devElectronConfig;
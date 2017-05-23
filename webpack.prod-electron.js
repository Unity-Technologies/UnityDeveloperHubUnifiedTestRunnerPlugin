const { resolve } = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const ProductionConfig = require('./webpack.prod.js');

const productionElectronConfig = Merge(ProductionConfig, {
    target: "electron-renderer"
})
module.exports = productionElectronConfig;

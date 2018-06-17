'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api/igrsiot"'
  // BASE_API: '"http://192.168.1.150:8080/igrsiot"'
  // BASE_API: '"../../static/data"'// 模拟数据
})

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM"'
})

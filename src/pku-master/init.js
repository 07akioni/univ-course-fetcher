const fs = require('fs')
const util = require('./util')

function init () {
  if (!fs.existsSync(util.dataRoot)) {
    fs.mkdirSync(util.dataRoot)
  }
  if (!fs.existsSync(util.dataPath)) {
    fs.mkdirSync(util.dataPath)
  }
  if (!fs.existsSync(util.rawDataPath)) {
    fs.mkdirSync(util.rawDataPath)
  }
}

module.exports = init
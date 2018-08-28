const path = require('path')

module.exports = {
  metaPath: path.resolve(__dirname, 'meta.js'),
  configPath: path.resolve(__dirname, 'config.js'),
  dataRoot: path.resolve(__dirname, '..', '..', 'data'),
  dataPath: path.resolve(__dirname, '..', '..', 'data', 'pku-master'),
  rawDataPath: path.resolve(__dirname, '..', '..', 'data', 'pku-master', 'raw'),
  tempPath: path.resolve(__dirname, 'temp'),
}
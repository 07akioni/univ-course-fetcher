const path = require('path')

function generateSemesterId (semesterStr) {
  const [x, y, z] = semesterStr.split('-').map(v => parseInt(v, 10))
  return 2 * x  - z
}

module.exports = {
  metaPath: path.resolve(__dirname, 'meta.js'),
  configPath: path.resolve(__dirname, 'config.js'),
  dataRoot: path.resolve(__dirname, '..', '..', 'data'),
  dataPath: path.resolve(__dirname, '..', '..', 'data', 'tongji'),
  rawDataPath: path.resolve(__dirname, '..', '..', 'data', 'tongji', 'raw'),
  tempPath: path.resolve(__dirname, 'temp'),
  generateSemesterId
}
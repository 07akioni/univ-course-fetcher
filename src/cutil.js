/**
 * Common Utils
 */

/**
 * Convert a header string to header object.
 * @param {string} rawHeader
 */
function parseHeader (rawHeader) {
  rawHeader = rawHeader.trim()
  const headerLines = rawHeader.split('\n')
  const header = Object.create(null)
  headerLines.forEach(line => {
    const lineParts = line.split(':')
    let key = lineParts[0]
    let value = lineParts.slice(1, lineParts.length).join('')
    key = key.trim()
    value = value.trim()
    if (key && value) {
      header[key] = value
    }
  })
  return header
}

/**
 * async sleep function
 * @param {number} ms 
 */
async function sleep (ms) {
  await new Promise(res => {
    setTimeout(res, ms)
  })
}

/**
 * Clear space, enter and tab in a string, for html content debugging.
 * @param {string} str 
 */
function clearSpace (str) {
  const spaces = /(\s|\n|\t)+/g
  return str.replace(spaces, ' ').trim()
}


exports.parseHeader = parseHeader
exports.sleep = sleep
exports.clearSpace = clearSpace
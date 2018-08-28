const { deptInfo } = require('./meta')
const fs = require('fs')
const path = require('path')
const util = require('./util')
const config = require('./config')
const fetch = require('./fetch')
const init = require('./init')

async function main () {
  init()
  const rawDataPath = path.resolve(
    util.dataPath,
    'raw'
  )
  for (let semaster of config.semaster2Fetch) {
    for (let [index, dept] of deptInfo.entries()) {
      console.log(`${index + 1} / ${deptInfo.length}`)
      const fname = `${semaster}-${dept[1]}-${dept[0]}`
      const courses = await fetch.fetchDeptQuery(dept[0], dept[1])
      fs.writeFileSync(
        path.resolve(
          rawDataPath,
          fname + '.json'
        ),
        JSON.stringify(courses, 0, 2)
      )
    }
  }
  return
}

main()
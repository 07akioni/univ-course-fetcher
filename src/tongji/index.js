const config = require('./config')
const info2fetch = config.info2fetch
const util = require('./util')
const fetch = require('./fetch')
const meta = require('./meta')
const fs = require('fs')
const path = require('path')
const transformClassInfo = require('./transform')
const init = require('./init')

async function main () {
  init()
  for (let semesterStr of info2fetch) {
    if (fs.existsSync(path.resolve(
      util.dataPath,
      'raw',
      `${semesterStr}.json`
    ))) {
      console.log(`${semesterStr}.json exists`)
      continue
    }
    let coursesInSemester = []
    const semesterId = util.generateSemesterId(semesterStr)
    let allLength = 0
    for (let [index, dept] of meta.deptInfo.entries()) {
      console.log(`${semesterStr} : ${index + 1} / ${meta.deptInfo.length} : ${dept[1]}`)
      const html = await fetch.fetchClass(semesterId, dept[0])
      const courses = fetch.parseResPage(html, dept[1])
      console.log(courses.length)
      allLength += courses.length
      coursesInSemester = coursesInSemester.concat(courses)
    }
    console.log('全部课程数量:', allLength)
    fs.writeFileSync(path.resolve(
      util.dataPath,
      'raw',
      `${semesterStr}.json`
    ), JSON.stringify(coursesInSemester, 0, 2))
  }

  for (let semesterStr of info2fetch) {
    const coursesInfoFile = fs.readFileSync(
      path.resolve(path.resolve(
        util.dataPath,
        'raw',
        `${semesterStr}.json`
      ))
    )
    let coursesInfo = JSON.parse(coursesInfoFile.toString())
    coursesInfo = coursesInfo.map(v => transformClassInfo(v))
    fs.writeFileSync(
      path.resolve(path.resolve(
        util.dataPath,
        `${semesterStr}.json`
      )),
      JSON.stringify(coursesInfo, 0, 2)
    )
  }
}

main()
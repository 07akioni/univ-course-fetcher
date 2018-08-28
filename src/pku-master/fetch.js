const { parseHeader, sleep } = require('../cutil')
const config = require('./config')
const request = require('superagent')
const { parseQueryHtml } = require('./parse')

async function makeAPost (deptId) {
  const res = await request
    .post(config.host + '/elective2008/edu/pku/stu/elective/controller/courseQuery/getCurriculmByForm.do')
    .set(parseHeader(config.postRawHeader))
    .send({
      '{actionForm.courseID}': '',
      '{actionForm.courseName}': '',
      'wlw-select_key:{actionForm.deptID}OldValue': 'true',
      'wlw-select_key:{actionForm.deptID}': deptId,
      'wlw-select_key:{actionForm.courseDay}OldValue': 'true',
      'wlw-select_key:{actionForm.courseDay}': '',
      'wlw-select_key:{actionForm.courseTime}OldValue': 'true',
      'wlw-select_key:{actionForm.courseTime}': '',
      'wlw-checkbox_key:{actionForm.queryDateFlag}OldValue': 'false',
      'deptIdHide': deptId
    })
  console.log('sleep for 5 seconds')
  await sleep(5000)
}

function buildQuery (page, deptId) {
  return `?netui_pagesize=syllabusListGrid%3B50&wlw-checkbox_key%3A%7BactionForm.queryDateFlag%7DOldValue=false&wlw-select_key%3A%7BactionForm.courseTime%7DOldValue=true&wlw-select_key%3A%7BactionForm.courseTime%7D=&netui_row=syllabusListGrid%3B${50 * page}&wlw-select_key%3A%7BactionForm.courseDay%7DOldValue=true&deptIdHide=${deptId}&wlw-select_key%3A%7BactionForm.courseDay%7D=&%7BactionForm.courseName%7D=&wlw-select_key%3A%7BactionForm.deptID%7D=${deptId}&wlw-select_key%3A%7BactionForm.deptID%7DOldValue=true&%7BactionForm.courseID%7D=`
}

async function fetchDeptQuery (deptId, name) {
  console.log(`fetchDeptQuery(deptId=${deptId}${name?`, name=${name}` : ''})`)
  console.log('先发一个 post 请求')
  await makeAPost(deptId)
  let page = 0
  let coursesOfDept = []
  while (true) {
    console.log(`page ${page}`)
    const res = await request
      .get(config.host + config.path + buildQuery(page, deptId))
      .set(parseHeader(config.rawHeader))
    if (res.text.indexOf('您尚未登录或者会话超时,请重新登录')) {
      throw new Error('登陆的 Cookie 坏了!')
    }
    const courses = parseQueryHtml(res.text)
    console.log('sleep for 5 seconds')
    await sleep(5000)
    coursesOfDept = coursesOfDept.concat(courses)
    if (courses.length < 50) {
      console.log('done')
      break
    }
    page++
  }
  return coursesOfDept
}

module.exports = {
  fetchDeptQuery
}
const util = require('./util')
const cutil = require('../cutil')
const request = require('superagent')
const config  = require('./config')
const cheerio = require('cheerio')

async function fetchClass (semesterId, departmentId) {
  try {
    const res = await request
      .post(config.host + config.path)
      .set(cutil.parseHeader(config.rawHeader))
      .send(`campusId=&semester.id=${semesterId}&departmentId=${departmentId}`)
    return res.text
  } catch (err) {
    console.log(err)
  }
}

function parseResPage (html, departmentName) {
  const properties = ["课程编号", "课名", "学时", "学分", "考试考查", "始止周", "教师名", "职称", "额定人数", "选课人数", "上课时间（地点）", "选课备注", "说明"]
  const $ = cheerio.load(html)
  const mainTable = $('.listTable1')
  const trs = mainTable.find('tr')
  courses = []
  trs.each(function (index, el) {
    if (index === 0) {
      return
    } else {
      const tds = $(el).find('td')
      course = {}
      $(tds).each(function (index, el) {
        course[properties[index]] = $(el).text().trim()
      })
      course['开课院系'] = departmentName
      courses.push(course)
    }
  })
  return courses
}

/**;(async function () {
  const html = await fetchClass(104, 12)
  const res = parseResPage(html)
  console.log(res.length)
})()*/

module.exports = {
  fetchClass,
  parseResPage
}
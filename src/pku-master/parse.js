const cheerio = require('cheerio')

const fields = [
  '课程号',
  '课程名',
  '课程类别',
  '学分',
  '教师',
  '班号',
  '开课单位',
  '专业',
  '年级',
  '上课时间及教室',
  '限数/已选',
  '备注',
  '加入培养计划'
]

function parseQueryHtml (html) {
  const $ = cheerio.load(html)
  const courses = []
  $('tr.datagrid-even,tr.datagrid-odd').each(function (index, el) {
    const course = {}
    const valueEls = $(el).find('td')
    valueEls.each(function (index, el) {
      if (index === 10 || index === 12) return
      if (index === 0) {
        const url = 'http://elective.pku.edu.cn/' + $(el).find('a').attr('href')
        course.url = url
      }
      course[fields[index]] = $(el).text().trim()
    })
    courses.push(course)
  })
  console.log(courses.slice(0, 1))
  console.log(courses.length)
  return courses
}

exports.parseQueryHtml = parseQueryHtml
const rawHeader = `
field: value
`

const host = '4m3.tongji.edu.cn'
const path = '/eams/electionCourseTableForCampusOfStd!search.action'

const info2fetch = [
  '16-17-1',
  '16-17-2',
  '17-18-1',
  '17-18-2'
]

module.exports = {
  rawHeader,
  host,
  path,
  info2fetch
}
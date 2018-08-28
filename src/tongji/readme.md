开始爬取之前需要拿到`Cookie`，当然肯定需要你能有校园账号

需要设置`config.js`中的`rawHeader`，否则无法爬取

你需要自己将访问 `4m3.tongji.edu.cn/eams/electionCourseTableForCampusOfStd!search.action`的一堆`Header`贴进去

我自己使用的 `rawHeader` 包含下面的字段
- Accept
- Origin
- X-Requested-With
- User-Agent
- Content-Type
- Referer
- Accept-Encoding
- Accept-Language
- Cookie
`config.js`里还有一些其他设置
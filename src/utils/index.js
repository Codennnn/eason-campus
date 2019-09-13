function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function getTodayInfo (start) {
  const WEEKLEN = 7 // 一周7天为常量
  const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
  const oneDay = 1000 * 60 * 60 * 24 // 一天的毫秒时长
  let weekLeave // 开学当天所在周剩余天数
  let weekStart // 开学当天是星期几
  let today // 今天
  let dateDiff // 今天与开学当天日期差
  let startDate // 开学之日，日期对象
  let weekInfo = { week: null, day: null }

  startDate = new Date(start.replace('-', '/'))
  weekStart = startDate.getDay()
  weekStart = weekStart === 0 ? 7 : weekStart // JS中周日的索引为0，这里转换为7，方便计算
  weekLeave = WEEKLEN - weekStart
  today = new Date()
  weekInfo.day = WEEKDAYS[today.getDay()] // 计算当前是星期几
  today = new Date(
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
  )
  dateDiff = today - startDate
  dateDiff = parseInt(dateDiff / oneDay)
  // 计算当前是第几周
  weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN)

  return {
    currentWeek: weekInfo.week,
    currentDay: today.getDay() - 1,
    currentDate: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  }
}

export default {
  formatNumber,
  formatTime,
  getTodayInfo
}

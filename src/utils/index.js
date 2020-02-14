export function getTodayInfo(start) {
  const WEEKLEN = 7 // 一周7天为常量
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
  weekInfo.day = today.getDay() // 计算当前是星期几
  today = new Date(
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
  )
  dateDiff = today - startDate
  dateDiff = parseInt(dateDiff / oneDay)
  // 计算当前是第几周
  weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN)

  return {
    currentWeek: weekInfo.week,
    currentDay: weekInfo.day,
    currentDate: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  }
}

export default {
  getTodayInfo
}

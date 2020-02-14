import request from './request'

// 测试环境
// const host = 'http://localhost:7001'
// 线上环境
const host = 'https://hrspider.top/api'

// 登录
export function login(data) {
  return request.post(`${host}/login`, data)
}

// 学生信息
export function getStudentInfo(data) {
  return request.post(`${host}/info`, data)
}

// 课表信息
export function getSchedule(data) {
  return request.post(`${host}/schedule`, data)
}

// 当前学期的成绩
export function getCurrentGrades(data) {
  data.current_term = '2019年第一学期'
  return request.post(`${host}/current-grade`, data)
}

// 全部学期的成绩
export function getAllGrades(data) {
  return request.post(`${host}/all-grades`, data)
}

// 考试时间
export function getExamTime(data) {
  return request.post(`${host}/exam-time`, data)
}

// 考勤信息
export function getAttendance(data) {
  return request.post(`${host}/attendance`, data)
}

// 平时成绩
export function getUsualGrades(data) {
  return request.post(`${host}/usual-grades`, data)
}

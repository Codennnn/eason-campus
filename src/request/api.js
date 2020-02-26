import request from './request'

const { post } = request

// 登录
export function login(data) {
  return post(`/login`, data)
}

// 学生信息
export function getStudentInfo(data) {
  return post(`/info`, data)
}

// 课表信息
export function getSchedule(data) {
  return post(`/schedule`, data)
}

// 当前学期的成绩
export function getCurrentGrades(data) {
  data.current_term = '2019年第一学期'
  return post(`/current-grade`, data)
}

// 全部学期的成绩
export function getAllGrades(data) {
  return post(`/all-grades`, data)
}

// 考试时间
export function getExamTime(data) {
  return post(`/exam-time`, data)
}

// 考勤信息
export function getAttendance(data) {
  return post(`/attendance`, data)
}

// 平时成绩
export function getUsualGrades(data) {
  return post(`/usual-grades`, data)
}

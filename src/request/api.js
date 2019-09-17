import request from './request'

const host = 'http://localhost:7001'

// 登录
export async function login (data) {
  const res = await request.post(`${host}/login`, data)
  return res
}

// 学生信息
export async function getStudentInfo (data) {
  const res = await request.post(`${host}/info`, data)
  return res
}

// 课表信息
export async function getSchedule (data) {
  const res = await request.post(`${host}/schedule`, data)
  return res
}

// 当前学期的成绩
export async function getCurrentGrades (data) {
  data.current_term = '2019年第一学期'
  const res = await request.post(`${host}/current-grades`, data)
  return res
}

// 全部学期的成绩
export async function getAllGrades (data) {
  const res = await request.post(`${host}/all-grades`, data)
  return res
}

// 平时成绩
export async function getUsualGrades (data) {
  const res = await request.post(`${host}/usual-grades`, data)
  return res
}

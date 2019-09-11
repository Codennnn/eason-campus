import request from './request'

const host = 'http://localhost:7001'

export async function login (data) {
  const res = await request.post(`${host}/login`, data)
  return res
}

export async function getStudentInfo (data) {
  const res = await request.post(`${host}/info`, data)
  return res
}

export async function getSchedule (data) {
  const res = await request.post(`${host}/schedule`, data)
  return res
}

export async function getAllGrades (data) {
  const res = await request.post(`${host}/all-grades`, data)
  return res
}

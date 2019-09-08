const request = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'GET',
        success (res) {
          resolve(res.data)
        },
        fail (error) {
          reject(error)
        }
      })
    })
  },

  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          console.log(res.data)
          resolve(res.data)
        },
        fail (error) {
          reject(error)
        }
      })
    })
  }
}

export default request

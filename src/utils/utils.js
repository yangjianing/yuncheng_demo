// 工具函数库
// import config from '../config'
import { callbackify } from 'util';

// http get工具函数 获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      // url: config.host + url,
      url: url,
      method,
      header:{
        'content-type': 'application/json'
      },
      success: function (res) {
        resolve(res.data.data)
        // if (res.data.code === 0) {
        //   resolve(res.data.data)
        // } else {
        //   showModal('失败', res.data.data.msg)
        //   reject(res.data)
        // }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'Success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function getElementHeight (className, callback) {
  var query = wx.createSelectorQuery()
  query.select('.' + className).boundingClientRect(function (rect) {
    callback(rect.height)
  }).exec();
}

export function uploadImg (canvasId) {
  const screenWidth = wx.getSystemInfoSync().screenWidth;
  wx.canvasToTempFilePath({
    x: 0,
    y: screenWidth / 750 * (250 + 190),
    width: screenWidth,
    height: screenWidth / 750 * 50,
    destWidth: screenWidth,
    screenHeight: screenWidth / 750 * 50,
    quality: 1,
    fileType: 'jpg',
    canvasId,
    success: function (res) {
      //res.tempFilePath即为生成的图片路径
      wx.setStorageSync('imgUrl', res.tempFilePath)
      wx.navigateTo({
        url: `../detail/main`
      })
    }
  })
}

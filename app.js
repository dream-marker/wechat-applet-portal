const util = require('utils/util.js')
App({
  onLaunch: function () {
    // this.getUserInfo(user => {
    //   console.info(user)
    // }, true)
  },
  util: util,
  getUserInfo: function (callback, need) {
    var that = this
    need = (typeof need === 'undefined' ? false : need)
    if (!(need == 'undefined' ? false : need) && that.globalData.user != null) {
      if (typeof callback == "function") callback(that.globalData.user)
      else return that.globalData.user
      return
    }
    wx.showNavigationBarLoading()
    //调用登录接口
    wx.login({
      success: function (res) {
        var code = res.code
        wx.showNavigationBarLoading()
        wx.getUserInfo({
          success: function (res) {
            util.ajaxForm(that, '/api/auth', 'POST',
              {
                code: code,
                iv: res.iv,
                encryptedData: res.encryptedData,
                channel: that.globalData.channel,
                need: need
              },
              function (res) {
                that.globalData.user = res.data.data
                that.globalData.header_form.Cookie = "JSESSIONID=" + res.data.data.session
                that.globalData.header_json.Cookie = "JSESSIONID=" + res.data.data.session
                if (typeof callback == "function") callback(that.globalData.user)
                else return that.globalData.user
              }
            )
          },
          fail: function (res) {
            util.toast(that.constant.all.NET_WORK, 'none', 3000, false)
          },
          complete: function (res) {
            wx.hideNavigationBarLoading()
          }
        })
      },
      fail: function (res) {
        util.toast(that.constant.all.NET_WORK, 'none', 3000, false)
      },
      complete: function (res) {
        wx.hideNavigationBarLoading()
      }
    })
  },
  globalData: {
    user: null, // 用户信息保存
    auth: false, // 用户是否被授权 auth 页面使用
    first: true, // 是否是第一次进入 auth 页面使用
    channel: 1,
    header_form: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    header_json: { "Content-Type": "application/json;charset=UTF-8" },
    // httpDomain: 'http://127.0.0.1:8083',
    httpDomain: 'https://blmdz.cn/port8083',
  },
  constant: {
    all: {
      NET_WORK: '网络错误，请稍后重试',
      SYS_ERROR: '系统繁忙，请稍后重试'
    },
    reg: {
    }
  }
})

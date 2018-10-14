const app = getApp()

Page({
  data: {
    user: null
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(user => {
      that.setData({ user: user })
    }, false)
  },
  infoBindTap: () => {
    wx.navigateTo({ url: '/pages/me/info/index' })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '<・)))><< 快来和我一起来玩呀',
      path: '/pages/me/index'
    }
  }
})

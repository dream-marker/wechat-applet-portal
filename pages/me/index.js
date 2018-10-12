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
  }
})

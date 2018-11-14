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
  // 下拉刷新
  onPullDownRefresh: function (e) {
    var that = this
    app.getUserInfo(user => {
      that.setData({ user: user })
    }, true)
  },
  infoBindTap: () => {
    wx.navigateTo({ url: '/pages/me/info/index' })
  },
  bindgetuserinfo: function (info) {
    var that = this
    if (info.detail.errMsg == 'getUserInfo:ok') {
      app.getUserInfo(user => {
        that.setData({ user: user })
      }, false)
    }
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

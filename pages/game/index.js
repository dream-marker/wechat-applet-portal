const app = getApp()

Page({
  data: {
    apps: [],
    appShow: []
  },
  onLoad: function () {
    var that = this
    app.util.ajaxJson(app, '/api/app', 'GET', null, function (res) {
      if (res.data.success) {
        if (res.data.data == null || res.data.data.length == 0) return

        // 测试数据
        // var data = res.data.data[0]
        // for (var k = 0; k < 8; k++) {
        //   res.data.data.push(data)
        // }

        var obj
        res.data.data.forEach((value, index, array) => {
          var flag = (index === (res.data.data.length - 1))
          if (index % 2 === 0) {
            obj = new Object()
            obj.full = (!flag)
            obj.first = value
            if (flag) that.data.apps.push(obj)
          } else {
            obj.full = true
            obj.second = value
            that.data.apps.push(obj)
          }
        })
        that.data.appShow = res.data.data
      } else {
        that.data.apps = []
        that.data.appShow = []
      }
        that.setData({ apps: that.data.apps });
    })
  },
  gameBindTap: function (event) {
    // gameBindTap: (event) => {
    var that = this
    var id = event.currentTarget.dataset.id
    if (id === 1) {

    }
    for (var i = 0; i < that.data.appShow.length; i++) {
      var apps = that.data.appShow[i]
      if (apps.id === id) {
        if (apps.ad) {
          app.util.toast('此处应该跳转到AD页面', 'none', 2000, false)
        } else if (apps.arouse) {
          wx.navigateToMiniProgram({
            appId: apps.appId,
            path: apps.arouseUrl === null ? '' : apps.arouseUrl,
            envVersion: 'trial',
            success: (res) => {
              app.util.toast('跳转成功', 'none', 3000, false)
            },
            fail: (res) => {
              app.util.toast(res.errMsg === 'navigateToMiniProgram:fail can only be invoked by user TAP gesture.' ? '微信规定您至少进行一次点击才能跳转' : res.errMsg, 'none', 3000, false)
            }
          })
        } else {
          app.util.toast('什么页面都没有设置', 'none', 2000, false)
        }
        break
      }
    }
  }
})

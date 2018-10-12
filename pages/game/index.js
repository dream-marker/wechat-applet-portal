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
        var data = res.data.data[0]
        for (var k = 0; k < 8; k++) {
          res.data.data.push(data)
        }

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
    for (var i = 0; i < that.data.appShow.length; i++) {
      if (that.data.appShow[i].id === id) {
        console.info(that.data.appShow[i])
        break
      }
    }
  }
})

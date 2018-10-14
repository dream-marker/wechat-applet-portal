const app = getApp()

Page({
  data: {
    user: null,
    gender: null,
    genderIndex: 0,
    genderArray: ["未知", "男", "女"],
    // genderList: [0, 1, 2],
    birthday: null,
    area: null,
    areaIndex: 0,
    areaArray: ["??", "京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "川", "黔", "滇", "渝", "藏", "陕", "甘", "青", "宁", "新", "港", "澳", "台"],
    // areaList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(user => {
      that.setData({ user: user })
    }, false)

    app.util.ajaxJson(app, '/api/user', 'GET', null, function (res) {
      if (res.data.success) {
        that.setData({
          gender: that.data.genderArray[res.data.data.gender],
          genderIndex: res.data.data.gender,
          birthday: res.data.data.birthday,
          area: that.data.areaArray[res.data.data.area],
          areaIndex: res.data.data.area,
        })
      }
    })
  },
  genderBindChange: function (event) {
    var value = event.detail.value * 1

    this.setData({ gender: this.data.genderArray[value] })
  },
  birthdayBindChange: function (event) {
    var that = this
    var value = event.detail.value
    var obj = new Object()
    obj.birthday = value
    app.util.ajaxJson(app, '/api/user/birthday', 'PUT', obj, function (res) {
      if (res.data.success) {
        that.setData({ birthday: value })
      } else {
        app.util.toast(res.data.message, 'none', 3000, false)
      }
    })
  },
  areaBindChange: function (event) {
    var that = this
    var value = event.detail.value * 1
    var obj = new Object()
    obj.area = value
    app.util.ajaxJson(app, '/api/user/area', 'PUT', obj, function (res) {
      if (res.data.success) {
        that.setData({ area: that.data.areaArray[value] })
      } else {
        app.util.toast(res.data.message, 'none', 3000, false)
      }
    })
  }
})

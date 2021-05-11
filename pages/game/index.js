const app = getApp()

Page({
  data: {
    apps: [],
    serialSequence: '',
    appShow: [],
    showSelect: false,
    showList: [],
    searchList: [
      {title: 'TGBU5826032'},{title: 'TGBU5835246'},{title: 'TGBU5846271'},{title: 'TGBU5856371'},{title: 'TGBU5892176'},
      {title: 'TGBU5926172'},{title: 'TGBU5927351'},{title: 'TGBU5925167'},{title: 'TGBU5936517'},{title: 'TGBU5942761'},
      {title: 'TGBU5725611'},{title: 'TGBU5726531'},{title: 'TGBU5712971'},{title: 'TGBU5736152'},{title: 'TGBU5736751'},
      {title: 'TGBU5627161'},{title: 'TGBU5623718'},{title: 'TGBU5621563'},{title: 'TGBU5638971'},{title: 'TGBU5635615'},
      {title: 'TGBU5637612'},{title: 'TGBU5645625'},{title: 'TGBU5649827'},{title: 'TGBU5649811'},{title: 'TGBU5653781'},
      {title: 'TGBU5652871'},{title: 'TGBU5662817'},{title: 'TGBU5662198'},{title: 'TGBU5662193'},{title: 'TGBU5668739'},
      {title: 'TGBU5527121'},{title: 'TGBU5552178'},{title: 'TGBU5553782'},{title: 'TGBU5537871'},{title: 'TGBU5562713'},
      {title: 'TGBU5427121'},{title: 'TGBU5467821'},{title: 'TGBU5398171'},{title: 'TGBU5380981'},{title: 'TGBU5384671'},
    ]
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
  colseModel: function (e) {
    let _this = this
    _this.setData({
      showSelect: false,
      serialSequence: null
    })
  },
  getInputValue: function (e) {
    console.log(e.currentTarget.dataset.value)
    let _this = this
    _this.setData({
      showSelect: false,
      serialSequence: e.currentTarget.dataset.value
    })
    console.log(_this.data.serialSequence)
  },
  inputedit: function (e) {
    let _this = this
    let dataset = e.currentTarget.dataset
    let value = e.detail.value
    let name = dataset.name
    let list = []
    _this.data.searchList.forEach(res => {
      let obj = {title: ''}
      if (res.title.search(value) != -1) {
        obj.title = res.title
        list.push(obj)
      }
    })
    if (list.length <= 0) {
      let obj = {title: '暂无数据'}
      list.push(obj)
    }
    _this.setData({
      showList: list
    })
    if (value) {
      _this.setData({
        showSelect: true
      })
    } else {
      _this.setData({
        showSelect: false
      })
    }
    _this.data[name] = value
    _this.setData({
      name: _this.data[name]
    })
    console.log(_this.data[name])
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

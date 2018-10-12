/**
 * ajaxForm form 表单的请求 header 为 app.globalData.header_form
 * app 即 app.js
 * url 请求的地址(不包含域名, 域名在 app.js 内设置)
 * method 请求方法, 支持 POST 和 GET
 * data 请求的参数
 * success 成功后回调
 * fail 失败后回调
 * complete 相当于 finally
 */
const ajaxForm = (app, url, method, data, success, fail, complete) => {
  ajax(app, app.globalData.header_form, url, method, data, success, fail, complete, false)
}

/**
 * ajaxJson form 表单的请求 header 为 app.globalData.header_json
 * app 即 app.js
 * url 请求的地址(不包含域名, 域名在 app.js 内设置)
 * method 请求方法, 支持 POST 和 GET
 * data 请求的参数
 * success 成功后回调
 * fail 失败后回调
 * complete 相当于 finally
 */
const ajaxJson = (app, url, method, data, success, fail, complete) => {
  ajax(app, app.globalData.header_json, url, method, data, success, fail, complete, false)
}

/**
 * ajax for ajaxForm 和 ajaxJson 调用
 * app 即 app.js
 * url 请求的地址(不包含域名, 域名在 app.js 内设置)
 * method 请求方法, 支持 POST 和 GET
 * data 请求的参数
 * success 成功后回调
 * fail 失败后回调
 * complete 相当于 finally
 * flag 为 false 时 如果返回 code 为 706, 调用回去用户之后再次调用原请求; 为 true 时不会再次条用原请求
 */
const ajax = (app, header, url, method, data, success, fail, complete, flag) => {
  console.info(app.globalData.httpDomain + url, method)
  wx.showNavigationBarLoading()
  wx.request({
    url: app.globalData.httpDomain + url,
    data: data,
    header: header,
    method: method,
    success: function (res) {
      if (res.statusCode != 200) {
        toast(app.constant.all.SYS_ERROR, 'none', 3000, false)
        return;
      }
      if (res.data.success) {
        if (typeof success == "function") success(res)
        return
      }
      if (res.data.code == 5 && !flag) {
        app.getUserInfo(function (user) {
          ajax(app, header, url, method, data, success, fail, complete, true)
        }, true)
        return
      }
      if (typeof success == "function") success(res)
    },
    fail: function (res) {
      if (typeof fail == "function") fail(res)
      else toast(app.constant.all.NET_WORK, 'none', 3000, false)
    },
    complete: function (res) {
      wx.hideNavigationBarLoading()
      if (typeof complete == "function") complete(res)
    }
  });
}

/**
 * ajaxImage 图片上传
 * app 即 app.js
 * num 上传图片的数量 目前支持 1
 * success 成功后回调
 * fail 失败后回调
 * complete 相当于 finally
 * url 上传url
 */
const ajaxImage = (app, num, success, fail, complete, url) => {
  if (!url) url = '/api/img'
  wx.chooseImage({
    count: num,
    success: function (res) {
      upload(app, res.tempFilePaths[0], success, fail, complete, false, url)
    }
  })
}

/**
 * upload for ajaxImage 调用
 * app 即 app.js
 * tempFilePaths 上传文件路径
 * success 成功后回调
 * fail 失败后回调
 * complete 相当于 finally
 * flag 为 false 时 如果返回 code 为 706, 调用回去用户之后再次调用原请求; 为 true 时不会再次条用原请求
 */
const upload = (app, tempFilePaths, success, fail, complete, flag, url) => {
  wx.showNavigationBarLoading()
  wx.uploadFile({
    url: app.globalData.httpDomain + url,
    filePath: tempFilePaths,
    name: 'file',
    header: app.globalData.header_json,
    success: function (res) {
      if (res.statusCode != 200) {
        toast(app.constant.all.SYS_ERROR, 'none', 3000, false)
        return;
      }
      if (res.data.success) {
        if (typeof success == "function") success(res)
        return
      }
      if (res.data.code == 706 && !flag) {
        app.getUserInfo(function () {
          upload(app, tempFilePaths, success, fail, complete, true, url)
        }, true)
        return
      }
      if (typeof success == "function") success(res)
    },
    fail: function (res) {
      if (typeof fail == "function") fail(res)
      else toast(app.constant.all.NET_WORK, 'none', 3000, false)
    },
    complete: function (res) {
      wx.hideNavigationBarLoading()
      if (typeof complete == "function") complete(res)
    }
  })
}

/**
 * 弹窗提示
 * 见备注
 */
const toast = (title, icon, duration, mask, image, success, fail, complete) => {

  var obj = new Object()
  if (title != null && typeof title != 'undefined') obj.title = title //标题
  if (icon != null && typeof icon != 'undefined') obj.icon = icon //图标 支持"success"、"loading"、"none"
  if (image != null && typeof image != 'undefined') obj.image = image // 自定义图标的本地路径，image 的优先级高于 icon
  if (duration != null && typeof duration != 'undefined') obj.duration = duration //提示的延迟时间，单位毫秒，默认：1500
  if (mask != null && typeof mask != 'undefined') obj.mask = (!mask ? 2000 : mask) //是否显示透明蒙层，防止触摸穿透，默认：false
  if (typeof success == "function") obj.success = success //接口调用成功的回调函数
  if (typeof fail == "function") obj.fail = fail  //接口调用失败的回调函数
  if (typeof complete == "function") obj.complete = complete //接口调用结束的回调函数

  wx.showToast(obj)
}

/**
 * 弹窗确认
 * 见备注
 */
const modal = (title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor, success, fail, complete) => {

  var obj = new Object()
  if (title != null && typeof title != 'undefined') obj.title = title // 标题
  if (content != null && typeof content != 'undefined') obj.content = content // 内容
  if (showCancel != null && typeof showCancel != 'undefined') obj.showCancel = showCancel // 是否显示取消按钮
  if (cancelText != null && typeof cancelText != 'undefined') obj.cancelText = cancelText // 取消按钮的文字，最多 4 个字符
  if (cancelColor != null && typeof cancelColor != 'undefined') obj.cancelColor = cancelColor // 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
  if (confirmText != null && typeof confirmText != 'undefined') obj.confirmText = confirmText // 确认按钮的文字，最多 4 个字符
  if (confirmColor != null && typeof confirmColor != 'undefined') obj.confirmColor = confirmColor // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
  if (typeof success == "function") obj.success = success //接口调用成功的回调函数
  if (typeof fail == "function") obj.fail = fail  //接口调用失败的回调函数
  if (typeof complete == "function") obj.complete = complete //接口调用结束的回调函数

  wx.showModal(obj)
}

module.exports = {
  ajaxJson: ajaxJson,
  ajaxForm: ajaxForm,
  ajaxImage: ajaxImage,
  toast: toast,
  modal: modal
}

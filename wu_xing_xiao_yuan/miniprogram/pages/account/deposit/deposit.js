// miniprogram/pages/account/deposit/deposit.js
Page({
  data: {
    money: ""
  },

  validateNumber(val) { //判断输入的金额中是否含有字符
    return val.replace(/\D/g, '')
  },

  bindinput(e) {
    // console.log(e)
    let value = this.validateNumber(e.detail.value);
    this.setData({
      money: parseFloat(value)
    })
  },

  button() {
    if (this.data.money <= 0 || this.data.money == "") {
      wx.showToast({
        title: "纺院社区：请输入金额", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
        // success: function () {
        //     console.log("接口调用成功的回调函数");
        // },
        // fail: function () {
        //     console.log("接口调用失败的回调函数");
        // },
        // complete: function () {
        //     console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
        // }
      })
    } else if (this.data.money > 1000) {
      var that = this;
      wx.showToast({
        title: "纺院社区：输入金额过大", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
        // success: function () {
        //     console.log("接口调用成功的回调函数");
        // },
        // fail: function () {
        //     console.log("接口调用失败的回调函数");
        // },
        complete: function () {
          that.setData({
            money: 1000.00
          })
        }
      })
    } else {

      var that = this;
      const db = wx.cloud.database({ // 链接数据表
        env: "xgj1-056iz"
      });
      //查找接单用户的余额数量，提取用于相加 ，开始
      wx.showLoading({
        title: '数据加载中...',
        mask: true, // 是否显示透明蒙层，防止触摸穿透
      });
      db.collection('user').where({ //数据查询
        _openid: wx.getStorageSync('openId').result.openid //条件
      }).get({
        success: function (res) {
          //修改接单用户的金额
          db.collection('user').where({
            _openid: wx.getStorageSync('openId').result.openid
          }).update({
            // data 字段表示需新增的 JSON 数据
            data: {
              money: (parseFloat(res.data[0].money) + parseFloat(that.data.money)).toFixed(2),
            },
            success(res) {
              wx.hideLoading(); //结束数据加载中
              wx.showModal({
                title: "充值成功！", // 提示的标题
                content: "您已成功完成充值，感谢您的信任！", // 提示的内容
                showCancel: false, // 是否显示取消按钮，默认true
                cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
                confirmText: "确定", // 确认按钮的文字，最多4个字符
                confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
                complete: function () { // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                  //关闭当前页面并且回到上页面
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      })
      //查找接单用户的余额数量，提取用于相加 ，结束
    }
  }
})
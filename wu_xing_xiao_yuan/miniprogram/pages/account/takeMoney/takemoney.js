// miniprogram/pages/account/takeMoney/tekeMoney.js
Page({
  data: {
    money: {},
    userinfo: {},
    register: "",
    taskMoney: 0,
    index: 1,
    callPhone: "", //绑定的手机号
    name: "", //绑定的真实姓名
  },

  submit() { //提交
    // 获取日期，并且转化成订单号
    if (this.data.money >= this.data.taskMoney && this.data.taskMoney>=1 && this.data.taskMoney<=100) {
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp); //实例化变量date
      var str = date.getFullYear();
      str += "/"+(date.getMonth() + 1);
      str += "/"+date.getDate();
      console.log(str);
      // 数据库提交开始
      const db = wx.cloud.database({
        env: "xgj1-056iz"
      });
      db.collection('takeMoney').add({
        // data 字段表示需新增的 JSON 数据

        data: {
          // _openid: wx.getStorageSync('openId').result.openid,会自动添加，不需要自己输入
          state: false,
          time: str,
          name: this.data.name,
          callPhone: this.data.callPhone,
          money: (this.data.taskMoney-(this.data.taskMoney*0.01)).toFixed(2),
          payMethod: this.data.index == 0 ? "微信" : "支付宝",
        },
      })
      //改变用户账户金额
      db.collection('user').where({
        _openid: wx.getStorageSync('openId').result.openid//条件
      }).update({
        // data 字段表示需新增的 JSON 数据
        data: {
          money:(this.data.money-this.data.taskMoney).toFixed(2),
        },
      }) 
      // 数据库提交结束
      wx.showModal({
        title: "提交成功", // 提示的标题
        content: "已成功提交，即将返回上一页", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.navigateBack({
            delta: 1
          })
        }
      })

      
    }else if(this.data.money<this.data.taskMoney){
      wx.showModal({
        title: "提交失败", // 提示的标题
        content: "您没有足够的余额进行提现，再去接一点任务吧！", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.reLaunch({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
            url: "../hall/hall"
          })
        }
      })
    }else{
      wx.showModal({
        title: "提交失败", // 提示的标题
        content: "金额范围应该在 1<= x <=100", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.reLaunch({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
            url: "../hall/hall"
          })
        }
      })
    }

  },



  onShow() {
    var that = this;
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    }); // 提取缓存用户信息数据
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });
    db.collection('user').where({ //数据查询
      _openid: wx.getStorageSync('openId').result.openid //条件
    }).get({
      success: function (res) {
        that.setData({
          money: res.data[0].money,
        })
      }
    })

  },

  bindMoney(e) {
    let value = this.validateNumber(e.detail.value);
    this.setData({
      register: value,
      taskMoney: value
    })
  },
  validateNumber(val) { //判断输入的金额中是否含有字符
    return val.replace(/\D/g, '')
  },

  callPhone(e) {
    this.setData({
      callPhone: e.detail.value
    })
  },

  name(e) {
    this.setData({
      name: e.detail.value
    })
  },

  vxPay() {
    this.setData({
      index: 0
    })
  },
  zfbPay() {
    this.setData({
      index: 1
    })
  }
})
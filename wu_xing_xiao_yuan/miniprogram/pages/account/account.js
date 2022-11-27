// miniprogram/pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: "",
    money: -1,
    deposit: -1,
    openId:"",
    sum:0
  },

  async onShow() {
    
    if(wx.getStorageSync('openId')!=""){
      this.setData({
        openId: wx.getStorageSync('openId').result.openid
      });
    }

    var that = this;
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });
    db.collection('user').where({ //数据查询
      _openid: this.data.openId //条件
    }).get({
      success: function (res) {
        that.setData({
          headImg: res.data[0].headImg,
          money: res.data[0].money,
          deposit: res.data[0].deposit
        })
      }
    })

    wx.showLoading({
      title: '数据加载中...',
    });

    let count = await db.collection('takeMoney').where({
      _openid:this.data.openId
    }).count()
    count = count.total
    this.setData({
      sum: count
    })
    //通过for循环多次请求，并且把多次请求的数据放进同一个数组
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('takeMoney').where({
        _openid:this.data.openId
      }).skip(i).get()
      all = all.concat(list.data);
    }
    this.setData({
      arr: all.reverse()
    })


    wx.hideLoading();
  },
})
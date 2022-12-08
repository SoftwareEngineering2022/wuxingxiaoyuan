// miniprogram/pages/task/task.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    openid:"",
    userinfo:[],
  },

  // async onShow() {
    
  //   if(wx.getStorageSync('openId')!=""){
  //     this.setData({
  //       openId: wx.getStorageSync('openId').result.openid
  //     });
  //   }
  //   var that = this;
  //   const db = wx.cloud.database({ // 链接数据表
  //     env: "cloud1-9gaunl0x483e6245"
  //   });
  //   db.collection('userInfo').where({ //数据查询
  //     _openid: this.data.openId //条件
  //   }).get({
  //     success: function (res) {
  //       console.log(res.data[0])
  //       that.setData({
  //         avatarUrl: res.data[0].avatarUrl
  //       })
  //     }
  //   })

  // },



  getOpenid() {
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res)
      var openid = res.result.openid;
      this.setData({
       openid: openid
      });
      db.collection('userInfo').aggregate()
      .match({
        _openid:this.data.openid
      })
      .end()
      .then(res => {
        console.log('个人信息获取成功', res)
        this.setData({
          userinfo:res.list[0],
          nickName:res.list[0].nickName,
          avatarUrl:res.list[0].avatarUrl,
        })
      })
     }
    })},

    onLoad(options) {
      this.getOpenid()
    }
})
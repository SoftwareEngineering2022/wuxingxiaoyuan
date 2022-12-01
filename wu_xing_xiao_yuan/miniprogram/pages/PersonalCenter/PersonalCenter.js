// pages/PersonalCenter/PersonalCenter.js
// miniprogram/pages/user/user.js
Page({
  data: {
    userName: "",
    headImg: "",
    home: "",
    db: {},
    userinfo: {}
  },

  getUserProfile(e) {
    var that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync('userinfo', res.userInfo);
        // 数据库提交开始
        that.setData({
          userName: res.userInfo.nickName,
          headImg: res.userInfo.avatarUrl,
          home: res.userInfo.city
        })

        const db = wx.cloud.database({
          env: "xgj1-056iz"
        });
        db.collection('user').add({
          // data 字段表示需新增的 JSON 数据

          data: {
            userName: res.userInfo.nickName,
            headImg: res.userInfo.avatarUrl,
            home: res.userInfo.city,
            credibility: 500,
            money: "0.00",
            deposit: "0.00",
            qqEmail: "未填写",
            schoolId: "未填写",
            call: "未填写"
          },
        })
        // 数据库提交结束

        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                //   console.log('[云函数] [login] user openid: ', res.result.openid)          
                // this.setData({
                //    openId:res.result.openid
                //  })
                wx.setStorageSync('openId', res);
                if (this.usercallback) {
                  this.usercallback(res)
                }
              }
            });
          }
        })

      }
    })
    //获取用户openid
    // //获取用户openid 结束
    // const {
    //   userInfo
    // } = e.detail;
    // wx.setStorageSync('userinfo', userInfo);
    // const userinfo = wx.getStorageSync('userinfo');
    // this.setData({
    //   userinfo
    // });
    // console.log(e);


  },
<<<<<<< HEAD
=======
  
  changeweb1(){
    wx:wx.navigateTo({
      url: '../myPublish/myPublish',
    }) 
   },


  // getUserProfile(e) {
  //   var that = this;
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', 
  //     //desc必填信息 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       wx.setStorageSync('user', res.userInfo);
  //        //wx.setStorageSync 数据缓存
  //       // 数据库提交开始
  //       that.setData({
  //         userName: res.userInfo.nickName,
  //         headImg: res.userInfo.avatarUrl,
  //         home: res.userInfo.city
  //       })

  //       const db = wx.cloud.database({
  //         env: "cloud1-9gaunl0x483e6245"
  //       });

  //       db.collection('user').where({
          
  //       }).add({
  //         // data 字段表示需新增的 JSON 数据

  //         data: {
  //           userName: res.userInfo.nickName,
  //           headImg: res.userInfo.avatarUrl,
  //           // home: res.userInfo.city,
  //           credibility: 500,
  //           schoolId: "未填写",
  //           call: "未填写",
  //           role: "买家"
  //         },
  //       })
  //       // 数据库提交结束
>>>>>>> c41962f166ea2bd178659ca0735a250a4eccb97b


  onShow() {
    if (wx.getStorageSync('userinfo')) {
      const userinfo = wx.getStorageSync('userinfo');
      this.setData({
        userinfo
      });

      var that = this;
      const db = wx.cloud.database({ // 链接数据表
        env: "xgj1-056iz"
      });
      db.collection('user').where({ //数据查询
        _openid: wx.getStorageSync('openId').result.openid //条件
      }).get({
        success: function (res) {
          that.setData({
            headImg: res.data[0].headImg,
            userName: res.data[0].userName
          })
        }
      })
    }
  },
  /**
   * 页面的初始数据
   */

})
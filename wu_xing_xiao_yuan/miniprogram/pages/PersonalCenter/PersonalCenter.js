// pages/PersonalCenter/PersonalCenter.js
Page({
  data: {
    userinfo:[]
  },



 

  async  getUserProfile(){
    //1、用户授权获取信息
  const { userInfo:{nickName,avatarUrl} } = await wx.getUserProfile({
    desc: '用于完善会员资料',
  })
  //2、把当前用户信息交付后端，存储生成账号
  const { data } = wx.cloud.callFunction({
    // const { result:{data} } = wx.cloud.callFunction({
      name:'login',
      data:{
        nickName,
        avatarUrl
      },
    }).then(res=>{
      console.log(res)
      this.setData({
        userInfo:res.result.data
      })
    })

    // wx.getStorageSync('userInfo',data)

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

  //       wx.login({
  //         success: res => {
  //           // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //           wx.cloud.callFunction({
  //             name: 'login',
  //             data: {},
  //             success: res => {
  //               //   console.log('[云函数] [login] user openid: ', res.result.openid)          
  //               // this.setData({
  //               //    openId:res.result.openid
  //               //  })
  //               wx.setStorageSync('openId', res);
  //               if (this.usercallback) {
  //                 this.usercallback(res)
  //               }
  //             }
  //           });
  //         }
  //       })

  //     }
  //   })
  //   //获取用户openid
  //   //获取用户openid 结束
  //   // const { userInfo} = e.detail;
  //   // wx.setStorageSync('userinfo', userInfo);
  //   // const userinfo = wx.getStorageSync('userinfo');
  //   // this.setData({
  //   //   userinfo
  //   // });
  //   // console.log(e);


  // },
  //  onShow() {
  //   if (wx.getStorageSync('userInfo',data)) {
  //     const userinfo = wx.getStorageSync('userInfo');
  //     this.setData({
  //       userinfo
  //     });

  //     var that = this;
  //     const db = wx.cloud.database({ // 链接数据表
  //       env: "cloud1-9gaunl0x483e6245"
  //     });
  //     db.collection('userInfo').where({ //数据查询
  //       _openid: wx.getStorageSync('openId').result.openid //条件
  //     }).get({
  //       success: function (res) {
  //         that.setData({
  //           avatarUrl: res.data[0].avatarUrl,
  //           nickName: res.data[0].nickName
  //         })
  //       }
  //     })
  //   }
  // },
  // /**
  //  * 页面的初始数据
  //  */




 

})

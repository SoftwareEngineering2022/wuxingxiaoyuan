const app=getApp()
const db=wx.cloud.database()

var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '你好！'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    recordId:"",
    username:"",
    userhead:"",
    userinfo:""
  },
  
  onShow(){
    //this.setData({
      //userInfo: app.globalData.userInfo
    //}) 
  },

  // 功能：当点击好友的时候，传输好友信息
  onLoad(options) {
    this.getOpenid()
    var userid = wx.getStorageSync('userid')
    var username = wx.getStorageSync('username')
    var userhead = wx.getStorageSync('userhead')
    // 将数据更新成新的数据
    this.setData({
      recordId: userid,
      username: username,
      userhead: userhead
    })
    wx.setNavigationBarTitle({
      title:username
    })
    initData(this);
    this.setData({
      //cusHeadIcon: this.userinfo.avatarUrl,
      //cusHeadIcon: userInfo.avatarUrl
    });
  },

/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  },

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
          userinfo:res.list[0]    
        })
      })
     }
    })},
})

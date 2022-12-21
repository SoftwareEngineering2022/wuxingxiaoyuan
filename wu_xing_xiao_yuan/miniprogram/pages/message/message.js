// pages/message/message.js

const db=wx.cloud.database()
const $=db.command.aggregate
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chat_message:[],
    openid:"",
  },
//获取当前用户
  getOpenid() {
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res)
      var openid = res.result.openid;
      this.setData({
       openid: openid
      });
      db.collection('chat_record1').aggregate()
      .match({
        _openid:this.data.openid
      })
      .sort({
        chat_time:-1,
      })
      .end()
      .then(res => {
        console.log('聊天', res)
        this.setData({
          chat_message:res.list,  
        })
      })
     }
    })},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()
  },

  toEdit(e){
    const id=e.currentTarget.dataset.bid
    const username=e.currentTarget.dataset.name
    const userhead=e.currentTarget.dataset.head
    wx.setStorageSync('userid',id)
    wx.setStorageSync('username',username)
    wx.setStorageSync('userhead',userhead)
    wx.navigateTo({
      url: '../messagedetail/messagedetail',
    })
    console.log('传参成功')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.startPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideTabBarRedDot({
      index: 0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
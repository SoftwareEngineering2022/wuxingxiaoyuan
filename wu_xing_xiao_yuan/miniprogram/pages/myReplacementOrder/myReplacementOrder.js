// pages/myReplacementOrder/myReplacementOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部','待确认','已完成'],
    tabCur: 0, //默认选中、
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  tabSelect(e) {
    console.log(e)
   this.setData({
     tabCur: e.currentTarget.dataset.id,
     scrollLeft: (e.currentTarget.dataset.id - 2) * 200
   }, success => {
    
   })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
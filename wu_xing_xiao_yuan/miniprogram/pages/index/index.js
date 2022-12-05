// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  //由调用者决定调用什么
  data: {
    swiperTitle:"每日资讯",
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://cloud1-9gaunl0x483e6245.636c-cloud1-9gaunl0x483e6245-1314550294/swiper-photos/1.jpg'
<<<<<<< HEAD
      
=======
>>>>>>> parent of c41962f (完善跳转路径)
    }, {
      id: 1,
        type: 'image',
        url: 'cloud://cloud1-9gaunl0x483e6245.636c-cloud1-9gaunl0x483e6245-1314550294/swiper-photos/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'cloud://cloud1-9gaunl0x483e6245.636c-cloud1-9gaunl0x483e6245-1314550294/swiper-photos/3.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  changeweb1(){
   wx:wx.navigateTo({
     url: '../buy/buy',
   }) 
  },
<<<<<<< HEAD
  changeweb2(){
    wx:wx.navigateTo({
      url: '../change/change',
    }) 
   },
=======
>>>>>>> parent of c41962f (完善跳转路径)
  changeweb3(){
    wx:wx.navigateTo({
      url: '../donation/donation',
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
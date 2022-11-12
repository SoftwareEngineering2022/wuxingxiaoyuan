// pages/data.study/data.study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     info:'能不能不要再出错了！',
     imgsrc:'/image/3.png',
     randomNum1: Math.random()*10,
     randomNum2: Math.random().toFixed(3),
     count:0,
     msg:'你好啊！我的宝贝！'

  },
  btnTaphandle(e){
      console.log(e)
  },
  btnnumchange(){
    this.setData({
      count: this.data.count +1,
      info:2
    })
  },
  //传递参数的函数，使得num+参数值
  btnTap1(e){
    this.setData({
    count: this.data.count + e.target.dataset.info
    })
  },
  inputhandle(e){
    console.log(e.detail.value)
  },

  inputbind1(e){
    this.setData({
      msg: e.detail.value
    })
  },


 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
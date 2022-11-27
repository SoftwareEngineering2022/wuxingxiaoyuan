// pages/donationdetail/donationdetail.js
const db=wx.cloud.database()
const _=db.command
var state=false
Page({

  /**
   * 页面的初始数据
   */
  data:{
    currentChoose: 0,
    currenttime:0,
    currentweight:0,
    currentaddress:0,
    resume:0,
    selectArray: ["8.00-9.00","9:00-10:00","10:00-11:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00"],
    addressArray:["上师大东门","上师大南门","上师大菜鸟驿站","华理南门","华理菜鸟驿站","华理北门","应技大东门","应技大北门","应技大菜鸟驿站"],
    weightArray:["3-10kg","10-20kg","20-50kg","50kg以上"],
   time:"",
   address:"",
   weight:""

  },


  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentChoose: e.detail.value,
      currenttime: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentChoose: e.detail.value,
      currentaddress: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentChoose: e.detail.value,
      currentweight: e.detail.value
    })
  },

   submitdata(){
    db.collection("donationDetail").add({
      data:{
        time:this.data.selectArray[this.data.currenttime],
        address:this.data.addressArray[this.data.currentaddress],
        weight:this.data.weightArray[this.data.currentweight]
      }
    }).then(res=>{console.log(res)})
  },




  confirms(){
  wx.showModal({
    title: '温馨提示',
    content: '预约成功',
    success(res) {},
    fail(res){},
    showCancel:false,
    confirmText:"确定"
    }),

    this.submitdata()
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
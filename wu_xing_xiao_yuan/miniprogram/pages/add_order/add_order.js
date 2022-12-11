// pages/add_order/add_order.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:"",
  },
  
//获取商品
pay:function(e){
  let that = this
  db.collection('order')
  .get({
    success:function(res){
      console.log('获取商品成功',res)
      if(res.data.length == 0){
        wx.showToast({
          title: '你还未选择商品',
          icon:"none"
        })
      }else{
        wx.redirectTo({
          url: '../order/order'
        })
      }
    },fail:function(res){
      console.log('获取商品失败',res)
    }
  })
},
changeto(){
  wx.navigateTo({
    url: '../myPurchaseOrder/myPurchaseOrder',
  })
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection('order').get({
      success:function(res){
        console.log('获取订单商品成功',res)
        that.setData({
          goods:res.data[0],
        })
      },
      fail:function(res){
        console.log('获取订单商品失败',res)
      }
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

  },
})
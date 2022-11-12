// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quary:{},
    shopList:[],
    Page:1,
    pageSize:10,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      quary: options
    })

  this.getShoplist()

  },


   getShoplist(cb){
     wx.showLoading({
       title: '正在加载中',
     })
    wx.request({
      url: `https://applet-base-api-t.itheima.net/categories/${this.data.quary.id}/shops`,
      method:'GET',
      data:{
        _page: this.data.Page,
        _limit:this.data.pageSize

      },
      success:(res)=>{
        this.setData({
          shopList:[...this.data.shopList,...res.data],
        })
      }
    })
    wx.hideLoading()
    cb && cb()
    
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.quary.title
    })

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
    this.setData({
      //重置一些关键性数据
      page:1,
      shopList:[],
      
    })
    //重新请求数据
    this.getShoplist(()=>{wx.stopPullDownRefresh()})



  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      page:this.data.page+1
    })
    this.getShoplist()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
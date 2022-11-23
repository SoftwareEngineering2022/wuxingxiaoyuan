const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    fenlei:[],
    product:[],
    search:[],
    num:20,
    ss:false
  },
   // 分类跳转事件
   fenlei:function(e){
    console.log(e)
  },
  // 搜索事件
  search:function(e){
    let that = this
    db.collection('goodsList').where({
      name:e.detail.value
    }).get({
      success:function(res){
        that.setData({
          search:res.data
        })
        console.log('搜索成功',that.data.search)
        if(that.data.search == ""){
          wx.showToast({
            title: '未找到商品',
            icon:"none"
          })
        }
      },
      fail:function(res){
        console.log('搜索失败',res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('swiper').get({
      success:function(res){
        console.log('轮播图获取成功',res)
        that.setData({
          banner:res.data
        })
      },
      fail:function(res){
        console.log('轮播图获取失败',res)
      },
    })
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },
      fail:function(res){
        console.log('分类获取失败',res)
      },
    })
    db.collection('goodsList').get({
      success:function(res){
        console.log('商品获取成功',res)
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        console.log('商品获取失败',res)
      },
    })
  },
  
  
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
  onRefresh(){
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: '小园正在努力中...',
    })
    //console.log("下拉刷新啦");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000)
  }, 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    this.onRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
    let old_data = that.data.product
    const db = wx.cloud.database()
    db.collection('goodsList').skip(that.data.num)
      .get()
      .then(res => {
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
        this.setData({
          product: old_data.concat(res.data),
          num:that.data.num+20
        })
        if(res.data==""){
          wx.showToast({
          icon: 'none',
          title: '没有更多啦'
        })
        }
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
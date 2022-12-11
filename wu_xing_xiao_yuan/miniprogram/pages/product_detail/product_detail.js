// pages/product_detail/product_detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_name:"",
    product_src:[],
    product_price:0,
    product_detail:"",
    product_checked:"",
    product_freshness:"",
    product_sub:"",
    user_head:"",
    user_name:"",
    id:""
  },
  
   // 加入购物车
   into_shopping_cart:function(){
    let that = this
    db.collection('collection').where({
      product_id: that.data.id
    }).get({
      success:function(res){
        console.log(res)
        if(res.data == ""){
          db.collection('collection').add({
            data:{
            product_name:that.data.product_name,
            product_src:that.data.product_src[0],
            product_price:that.data.product_price,
            product_id:that.data.id,
            product_checked:""    
            },
            success:function(res){
              console.log('商品加入购物车成功',res)
              wx.showToast({
                title: '加入成功',
              })
            },
            fail:function(res){
              console.log('商品加入购物车失败',res)
            }
          })
        }else{
          wx.showToast({
            title: '已有这个商品',
            icon:'none'
          })
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 立即购买
  buy:function(){
    let that = this
    db.collection('collection').where({
      product_id: that.data.id
    }).get({
      success:function(res){
        console.log(res)
        if(res.data == ""){
          db.collection('collection').add({
            data:{
            product_name:that.data.product_name,
            product_src:that.data.product_src[0],
            product_price:that.data.product_price,
            product_id:that.data.id,
            product_checked:"" 
            },
            success:function(res){
              console.log('商品加入收藏夹成功',res)
              wx.switchTab({
                url: '../MyCollection/MyCollection',
              })
            },
            fail:function(res){
              console.log('商品加入收藏夹失败',res)
            }
          })
        }else{
          wx.switchTab({
            url: '../MyCollection/MyCollection',
          })
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    let that = this
    console.log('产品的id已获取',options.id)
    db.collection('goods').doc(options.id).get({
      success:function(res){
        console.log('商品详细信息获取成功',res)
        that.setData({
          product_src:res.data.src,
          product_name:res.data.goodsName,
          product_price:res.data.price,
          product_detail:res.data.info,
          product_freshness:res.data.freshness,
          product_sub:res.data.substitutionIntent,
          user_head:res.data.avatarUrl,
          user_name:res.data.nickName,
          id:res.data._id 
        })
      },
      fail:function(res){
        console.log('商品详细信息获取失败',res)
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

  }
})
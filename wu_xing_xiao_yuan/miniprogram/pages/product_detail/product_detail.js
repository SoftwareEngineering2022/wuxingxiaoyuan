// pages/product_detail/product_detail.js
const db = wx.cloud.database();

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
  // 提交订单
submit_order:function(){
  let that = this
  wx.showLoading({
    title: '提交中',
  })
  wx.hideLoading()
  db.collection('order').where({
    product_id: that.data.id
  }).get({
    success:function(res){
      console.log(res)
      if(res.data == ""){
        db.collection('order').add({
          data:{
          product_name:that.data.product_name,
          product_src:that.data.product_src[0],
          product_price:that.data.product_price,
          product_id:that.data.id,
          user_name:that.data.user_name,
          avatarUrl:that.data.user_head,
          order_time:db.serverDate(),
          },
          success:function(res){
            console.log('商品生成订单成功',res)
            wx.getStorageSync('name',goods.product_name)
            wx.navigateTo({
              //
              url: '../add_order/add_orders',
            })
          },
          fail:function(res){
            console.log('商品生成订单失败',res)
          }
        })
      }else{
        wx.navigateTo({
          url: '../add_order/add_order',
        })
      }
    },
    fail:function(res){
      console.log(res)
    }
  })
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
            product_checked:"",
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
  // 加入收藏夹
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
  //和他聊聊
intochat: function (event) {
  wx.setStorageSync('userid', this.data.user_id)
  wx.setStorageSync('username', this.data.user_name)
  wx.setStorageSync('userhead', this.data.user_head)
  //let that = this
        db.collection('chat_record1').add({
          data:{
            userid:this.data.user_id,
            username:this.data.user_name,
            userhead:this.data.user_head,
            chat_time:db.serverDate(),
            //chat1_time:this._formatTime(chat_time),
          },success:function(res){
            console.log('获取成功')
          wx.navigateTo({
            url: '/pages/chat/chat',
          })
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
          product_state:res.data.tardingMethod,
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
const db=wx.cloud.database()
Page({
  data: {
    product:[],
    product_sum:0,
    product_now:[],
    product_id:[],
    delet_id:[]
  },
// 支付事件
pay:function(e){
  let that = this
  db.collection('shopping_cart').where({
    product_checked:"true"
  }).get({
    success:function(res){
      console.log('获取商品成功',res)
      if(res.data.length == 0){
        wx.showToast({
          title: '你还未选择商品',
          icon:"none"
        })
      }else{
        wx.redirectTo({
          url: '../pay/pay'
        })
      }
    },fail:function(res){
      console.log('获取商品失败',res)
    }
  })
},
// 计算选择的商品数量
get_sum() {
  let that = this
  let sum = 0
  for(var x = 0;x<that.data.product.length;x++){
    if(that.data.product[x].product_checked == "true"){
      sum=sum+1
    }
  }
  that.setData({
    product_sum:sum
  })
},
// 选择事件
xuanze:function(e){
  let that = this
  console.log(e)
  that.setData({
    delet_id:that.data.delet_id.concat(e.detail.value[0])
  })
  if(e.detail.value.length !== 0){
    db.collection('shopping_cart').doc(e.target.dataset.id).update({
      data:{
        product_checked:"true"
      },success:function(res){
        that.onLoad()
      }
    })
  }else{
    db.collection('shopping_cart').doc(e.target.dataset.id).update({
      data:{
        product_checked:""
      },
      success:function(){
        that.onLoad()
      }
    })
  }
},
// 商品删除
delete:function(){
let that = this
wx.cloud.callFunction({
  name:"product_delet",
  complete: res => {
    console.log('删除商品成功',res)
    wx.showModal({
      title: '温馨提示',
      content: '删除成功',
      success(res) {},
      fail(res){},
      showCancel:false,
      confirmText:"确定"
      }),
    that.onLoad()
  },fail:function(res){
    console.log('删除商品失败',res)
  }
})
// 

},
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let that = this
    db.collection('shopping_cart').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          product:res.data,
        })
        that.get_sum()
      },
      fail:function(res){
        console.log('获取购物车商品失败',res)
      }
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
    let that = this
    db.collection('shopping_cart').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          product:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
      }
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
  
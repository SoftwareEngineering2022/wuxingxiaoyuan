// pages/myPurchaseOrder/myPurchaseOrder.js
const db = wx.cloud.database()
const $ = db.command.aggregate
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // TabCur: 0,
    // scrollLeft:0
    tabs: ['全部','待收货','已完成'],
    tabCur: 0, //默认选中、
    order:[],
    openid:"",
  },

  // tab的导航栏效果
  tabSelect(e) {
    console.log(e)
   this.setData({
     tabCur: e.currentTarget.dataset.id,
     scrollLeft: (e.currentTarget.dataset.id - 2) * 200
   }, success => {
     if(this.data.tabCur===1){
       this.get_prepare_data()
     }
     else if(this.data.tabCur===2){
       this.get_finished_data()
     }
     if(this.data.tabCur===0){
       this.get_all_data()
     }
   })
 },


 getOpenid() {
  wx.cloud.callFunction({
   name: 'getOpenid',
   complete: res => {
    console.log('云函数获取到的openid: ', res)
    var openid = res.result.openid;
    this.setData({
     openid: openid
    });
    db.collection('order').aggregate()
    .match({
     lable: '全部',
     _openid:this.data.openid
    })
    .sort({        //类似于orderBy
      order_time:-1,
    })
    .end()
    .then(res => {
      console.log('状态', res)
      this.setData({
        order: res.list
      })
    })
   }
  })},

// 获取全部的信息
  get_all_data(){
    if(this.data.openid.length!==0){
    db.collection('order').aggregate()
      .match({
       lable: '全部',
       _openid:this.data.openid
      })
      .end()
      .then(res => {
        console.log('状态', res)
        this.setData({
          order: res.list
        })
      })}
  },


  // 获取待取件的信息
  get_prepare_data(){
    if(this.data.openid.length!==0){
    db.collection('order').aggregate()
      .match({
      _openid:this.data.openid,
      lable: '待收货'
      })
      .end()
      .then(res => {
        console.log('状态', res)
        this.setData({
          order: res.list
        })
      })}
  },


  // 获得已完成的信息
get_finished_data(){
  if(this.data.openid.length!==0){
  db.collection('order').aggregate()
    .match({
     lable: '已完成',
     _openid:this.data.openid
    })
    .end()
    .then(res => {
      console.log('状态', res)
      this.setData({
        order: res.list
      })
    })}
},

  confirm(){
      db.collection('order').where({
       _openid:this.data.openid,
       product_name:this.data.order[0].product_name
      })
      .update({
        data:{
          lable:["全部","已完成"]
        }
      })
        .then(res => {
          console.log('成功保存', res)
          wx.showModal({
            title: '温馨提示',
            content: '保存成功',
            success(res) {},
            fail(res){},
            showCancel:false,
            confirmText:"确定"
            })
          })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOpenid();
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
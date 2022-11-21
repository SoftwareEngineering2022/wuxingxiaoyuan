// pages/personity/personity.js
const db=wx.cloud.database()
const _ =db.command
var myvalue=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo1:"",
    datalist:[]
  },

  //利用多个函数对查询的数据进行限制
  // getdata(){
  //   db.collection("demolmj")
  //   .limit(2)
  //   .skip(3)
  //   .field({
  //     author:true,
  //     content:true
  //   })
  //   .orderBy("time","asc")
  //   .get()
  //   .then(res=>{console.log(res)})
  // },

  // //在command中实现查询条件的多样化，以及多个条件嵌套查询
  // getHits(){
  //    db.collection("demolmj")
  //    .where(_.or([{author:"上海头条"},{hits:_.lte(100)}])
  //    )
  //    .get()
  //    .then(res=>{
  //      console.log(res),
  //      this.setData({
  //        datalist:res.data
  //      })
  //    })
  // },
  // exit(){
  //   db.collection("demolmj").doc("36789d866371efd5008c931973421ec9")
  //   .update({
  //    data:{
  //     //  tabs:_.push(["财经"])
  //     // tabs:_.pop()
  //     // tabs:_.unshift(['智慧','神明'])
  //     // tabs:_.pull("标签三")
  //     tabs:_.push({
  //       each:['小程序'],
  //       position:1
  //     })
  //   }
  //   })
  //   .then(res=>{
  //     console.log(res)
  //   })
  // },


  // 利用云函数获取标题以及点击量
  getData(num=5,page=0){
    wx.cloud.callFunction({
      name:"getDnaData",
      data:{
        num,
        page
      }
    }).then(res=>{
      this.setData({
        datalist:[...this.data.datalist,...res.result.data]
      })
    })
  },
  // 实现点击后阅读量自增加12
  clickhits(res){
    // 1.获取点击的id和index值
    // 2.云函数端进行阅读量的更新操作
    // 3.前端连后端，将具体的id值传给后端，实现具体某条数据的点击量自增
    // 4.重新渲染列表数据（利用watch监听进行实现，这里不进行演示）
    wx.showLoading({
      title: '正在加载中',
    })
    //获取到前端传来的id以及index值
    var id=res.currentTarget.dataset.id
    console.log(id)
    wx.cloud.callFunction({
      name:"addDnahit"
    }).then(res=>{
      console.log(res)
    })
    wx.hideLoading()

  },
  
  

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  this.getData()
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
    var page=this.data.datalist.length
    this.getData(2,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
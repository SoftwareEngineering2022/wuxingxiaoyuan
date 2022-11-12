// pages/conditions/condition judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     type:10,
     flag:false,
     arr1:['三星','华为','小米'],
     ArryList:[
      {id:1,name:'红红'},
      {id:2,name:'佩佩'},
      {id:3,name:'杏杏'}
    ]
  },
  btnget(){
     wx.request({
       url: 'https://www.escook.cn/api/get',
       method: 'GET',
       data:{
         name:'marry',
         age:20
       },
       success:(res)=>{
          console.log(res.data)
       }
     })
  },
  btnpost(){
    wx.request({
      url: 'https://www.escook.cn/api/post',
      method:'POST',
      data:{
        name:'marry',
        age:22
      },
      success:(res)=>{
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.btnget()
    this.btnpost()
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
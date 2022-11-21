// pages/budget/budgt.js
var urlArr=[];
var filePath=[]; //要学会防止重复定义

Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },
  addImg(){
     wx.chooseImage({
       success:res=>{
         filePath=res.tempFilePaths
         filePath.forEach((item,idx)=>{
           var fileName="Homebutton"+idx
           this.cloudfile(fileName,item)
        })
         
       }
     })
  },

  cloudfile(fileName,path){
    wx.cloud.uploadFile({
      cloudPath:fileName,
      filePath:path
    }).then(res=>{
      urlArr.push(res.fileID)
      console.log(urlArr)
      if(filePath.length==urlArr.length){
        this.setData({
          urlArr:urlArr
        })
      }
    })
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
// pages/message/message.js
var urlArr=[];
var filePath=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clickBtn(){
    wx.chooseImage({
      success:res=>{
        console.log(res.tempFilePaths)
        this.setData({
          arr:res.tempFilePaths  
           //在arr中去存储暂时存储的路径，并显示出来
        })
        filePath=res.tempFilePaths
      }
    })
  },
  //提交图片入库
  subBtn(){
    filePath.forEach((item,idx)=>{
      var filename=Date.now()+"_"+idx;
      this.cloudFile(filename,item)
    })
  },
  
  //提交图片入库函数 得到真实路径 待调用
  cloudFile(filename,path){
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      //上传要有两个参数，路径文件名
      cloudPath:filename+".jpg",
      //临时路径filepath
      filePath:path
    }).then(res=>{
      urlArr.push(res.fileID)
      if(filePath.length==urlArr.length){
        this.setData({
          urlArr
        })
      }
      wx.hideLoading()
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
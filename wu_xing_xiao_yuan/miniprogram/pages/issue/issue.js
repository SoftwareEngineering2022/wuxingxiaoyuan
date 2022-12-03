var urlArr=[];
var filePath=[];
const db=wx.cloud.database()
// pages/distribute/distribute.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    img:[]
  },
  

 // 上传图片
 upload_img:function(){
  let that = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths)
      wx.cloud.uploadFile({
        cloudPath: 'product/'+timestamp+'.png',
        filePath: tempFilePaths[0], // 文件路径
        success: function(res) {
          // get resource ID
          console.log(res.fileID)
          that.setData({
            img:that.data.img.concat(res.fileID)
          })
        },
        fail: function(res) {
          // handle error
        }
      })
    }
  })
},
// 删除图片
  // 删除数组中指定下标
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    img.splice(id,1)
    that.setData({
      img: img
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      },
    })
    console.log(that.data.img)
  },

  getData(){
    db.collection("goods").add({

    })
  },

  btnTapHandler(e){
    
  },

  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.goodsName!==""&&e.detail.value.description!==""&&e.detail.value.useDegree!==""&&e.detail.value.category!==""&&e.detail.value.tradingMethod!==""&&e.detail.value.price!==""&&that.data.img.length!==0){
      db.collection("goods").add({
        data:{
          goodsName:e.detail.value.goodsName,
          description:e.detail.value.description,
          useDegree:e.detail.value.useDegree,
          category:e.detail.value.category,
          tradingMethod:e.detail.value.tradingMethod,
          price:that.data.price,
          num:0,
          product_xq_src:""
        },success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_up/store_operation_up',
          })
        }
      })
    }else{
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  bindShowMsg(){
    
  },
  

  getSwiperList(){
     
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
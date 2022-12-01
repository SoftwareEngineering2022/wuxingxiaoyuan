// pages/upload/upload.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:[],
    showView: false,
    showView2: false,
  },
  /*显示隐藏内容*/


  /*上传图片 */
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为："+timestamp);
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'goods/'+timestamp+'.png',//上传至goods文件夹
          filePath: tempFilePaths[0],
          success: function(res){
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          },
          fail: function(res){
            //handle error
          }
        })
      }
    })
  },
    /*删除图片 */
    delete:function(e){
      let that = this
      console.log(that.data.img)
      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id;
      var img = that.data.img;
      img.splice(id,1)
      that.setData({
        img:img
      })
      wx.cloud.deleteFile({
        fileList: [e.currentTarget.dataset.src],
        success: res => {
          //handle success
          console.log(res.fileList)
        },
        fail: err =>{
          //handle error
        },
      })
      console.log(that.data.img)
    },
    submit:function(e){
      let that = this
      console.log(e)
      if(e.detail.value.goodsName!=""&&e.detail.value.fenlei!=""&&e.detail.value.tardingMethod!=""&&e.detail.value.info!=""){//&&that.data.img.length!==0允许不上传图片
        db.collection('goods').add({
          data:{
            goodsName:e.detail.value.goodsName,
            category:e.detail.value.fenlei,
            freshness:e.detail.value.freshness+'成新',
            tardingMethod:e.detail.value.tardingMethod,
            substitutionIntent:e.detail.value.substitutionIntent,
            price:e.detail.value.price,
            info:e.detail.value.info,
            src:that.data.img,
            // num:0
          },success:function(res){
            wx.showToast({
              title: '发布成功',
            })
            
          }
        })
      }else{
        wx.showToast({
          title: '您还有未填写的信息',
          icon:"none"
        })
      }
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this
    db.collection('fenlei').get({
      success:function(res){
        console.log('获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },fail:function(res){
        console.log('获取失败',res)
      }
    })
    showView: (options.showView == "true" ? true : false)
    showView2: (options.showView2 == "true" ? true : false)
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
     showView: (!that.data.showView)
    })
   },
   onChangeShowState2: function () {
    var that = this;
    that.setData({
     showView2: (!that.data.showView2)
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
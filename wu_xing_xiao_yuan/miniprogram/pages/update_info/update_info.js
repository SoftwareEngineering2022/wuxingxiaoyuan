// pages/update_info/update_info.js
const db = wx.cloud.database()
const $ = db.command.aggregate
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    new_username:'',
    openid:''

  },
  updata: function(e){
    this.data.new_username = e.detail.value;
  },
  submit_name(){
    if(this.data.new_username!=''){
    db.collection('userInfo').where({
     _openid:this.data.openid
    })
    .update({
      data:{
        nickName:this.data.new_username
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
      
  }

  },

  




  
  submit_data(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      username:options.name,
      openid:options.openid
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
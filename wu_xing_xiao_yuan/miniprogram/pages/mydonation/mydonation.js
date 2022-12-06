// pages/mydonation/mydonation.js
const db = wx.cloud.database()
const $ = db.command.aggregate
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部','待取件','已完成'],
    tabCur: 0, //默认选中、
    donation_data:[],
    openid:""
		

  },
  // 获取openid与全部的捐赠信息
  getOpenid() {
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res)
      var openid = res.result.openid;
      this.setData({
       openid: openid
      });
      db.collection('donationDetail').aggregate()
			.match({
       lable: '全部',
       _openid:this.data.openid
      })
			.end()
			.then(res => {
				console.log('状态', res)
				this.setData({
					donation_data: res.list
				})
      })
     }
    })},
    // 获得所有信息
    get_all_data(){
      if(this.data.openid.length!==0){
      db.collection('donationDetail').aggregate()
        .match({
         lable: '全部',
         _openid:this.data.openid
        })
        .end()
        .then(res => {
          console.log('状态', res)
          this.setData({
            donation_data: res.list
          })
        })}
    },


    // 获取待取件的信息
    get_prepare_data(){
      if(this.data.openid.length!==0){
      db.collection('donationDetail').aggregate()
        .match({
         lable: '待取件',
         _openid:this.data.openid
        })
        .end()
        .then(res => {
          console.log('状态', res)
          this.setData({
            donation_data: res.list
          })
        })}
    },


    // 获得已完成的信息
  get_finished_data(){
    if(this.data.openid.length!==0){
    db.collection('donationDetail').aggregate()
			.match({
       lable: '已完成',
       _openid:this.data.openid
      })
      .end()
			.then(res => {
				console.log('状态', res)
				this.setData({
					donation_data: res.list
				})
      })}
  },
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
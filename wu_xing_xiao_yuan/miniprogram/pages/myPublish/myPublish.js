// pages/myPublish/myPublish.js
const db=wx.cloud.database()
const $ = db.command.aggregate
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    openid:""
  },
  // showModal(e) {
  //   this.setData({
  //     modalName: e.currentTarget.dataset.target
  //   })
  // },
  // hideModal(e) {
  //   this.setData({
  //     modalName: null
  //   })
  // },
// /*下架商品 */
//   delete_goods:function(e){ 
//    let that = this
//    db.collection('goods').doc(product._id).remove({
//      success:function(res){
//        console.log('删除成功',res)
//        wx.cloud.deleteFile({
//          fileList:that.data.img,
//          success:res=>{
//            // handle success
//            console.log(res.fileList)
//          },
//          fail:err=>{
//            // handle fail
//          }
//        })
//      }
//    })
//  },

//  delete(){
// 	wx.showModal({
// 	  title: '提示',
// 	  content: '您确定要下架该商品吗？',
// 	  success (res) {
// 	    if (res.confirm) {
//         console.log('用户点击确定')
//         let that = this
//         db.collection('goods').doc(this.data.id).remove({
//           success:function(res){
//             console.log('删除成功',res)
//             wx.cloud.deleteFile({
//               fileList:that.data.img,
//               success:res=>{
//                 // handle success
//                 console.log(res.fileList)
//               },
//               fail:err=>{
//                 // handle fail
//               }
//             })
//           }
//         })
// 	    } else if (res.cancel) {
//         console.log('用户点击取消')
// 	    }
// 	  }
// 	})
// },


getOpenid() {
  wx.cloud.callFunction({
   name: 'getOpenid',
   complete: res => {
    console.log('云函数获取到的openid: ', res)
    var openid = res.result.openid;
    this.setData({
     openid: openid
    });
    db.collection('goods').aggregate()
    .match({
      _openid:this.data.openid
    })
    .sort({        //类似于orderBy
      upload_time: -1,
    })
    .end()
    .then(res => {
      console.log('状态', res)
      this.setData({
        product: res.list,
      })
    })
   }
  })},


  // .orderBy('upload_time','desc')
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    this.getOpenid()
  },

  toEdit(e){
    const id=e.currentTarget.id
    wx.navigateTo({
      url: '../editPublish/editPublish?id='+id,
    })
    console.log(id)
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
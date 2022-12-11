// pages/upload/upload.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		chek:[false,false,false,false,false],
		leibie:['食品','美妆','文具','生活用品','其它'],
    fenlei:[],
    img:[],
    id:"",
    showView: false,
    showView2: false,
    goodsName:"",
    category:"",
    freshness:"",
    tardingMethod:[],
    substitutionIntent:"",
    price:"",
    info:"",
    img:[]    
  },
	/*显示隐藏内容*/
	// checkboxChange(e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  //   const items = this.data.items
  //   const values = e.detail.value
  //   for (let i = 0, lenI = items.length; i < lenI; ++i) {
  //     items[i].checked = false
  //     for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
  //       if (items[i].value === values[j]) {
  //         items[i].checked = true
  //         break
  //       }
  //     }
  //   }
	// },

	deletegoods:function(e){
		let that = this
		db.collection('goods').doc(that.data.id).remove({
			success:function(res){
				console.log('删除成功','res.data')
				wx.cloud.deleteFile({
					fileList: that.data.img,
					success:function(res){
						wx.showToast({
								title: '删除成功',
							 success:function(res){
									setTimeout(function () {
							wx.redirectTo({
							url: '../myPublish/myPublish',
							})
						 }, 1000)
					 }
				 })
			 },
					fail:err=>{
					},
				})
			}
		})
	},
	
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
				wx.redirectTo({
					url: '../myPublish/myPublish',
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
    update1:function(e){
      let that = this
      console.log(e)
      if(e.detail.value.goodsName!=""&&e.detail.value.fenlei!=""&&e.detail.value.tardingMethod!=""&&e.detail.value.info!=""&&that.data.img.length!==0){//不允许不上传图片
        db.collection('goods').doc(that.data.id).update({
          data:{
            goodsName:e.detail.value.goodsName,
            category:e.detail.value.fenlei,
            freshness:e.detail.value.freshness,
            tardingMethod:e.detail.value.tardingMethod,
            substitutionIntent:e.detail.value.substitutionIntent,
            price:e.detail.value.price,
            info:e.detail.value.info,
            src:that.data.img,
						// update_time: timeutil.TimeCode(new Date()),
            upload_time:db.serverDate(),
            // num:0
          },success:function(res){
           wx.showToast({
               title: '修改成功',
              success:function(res){
                 setTimeout(function () {
             wx.redirectTo({
             url: '../myPublish/myPublish',
             })
            }, 1000)
          }
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
  onLoad:function(options) {
    let that= this
    that.setData({
      id:options.id
    })
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
    db.collection('goods').doc(options.id).get({
      success:function (res) {
        console.log('获取成功',res)
        that.setData({
          goodsName:res.data.goodsName,
          category:res.data.category,
          freshness:res.data.freshness,
          tardingMethod:res.data.tardingMethod,
          substitutionIntent:res.data.substitutionIntent,
          price:res.data.price,
          info:res.data.info,
          img:res.data.src
				})
		
      },
      fail:function (res) {
        console.log('信息获取失败',res)
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
	 
  //  deletegoods1(){
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定要删除该商品吗？',
  //     success (res) {
  //       if (res.confirm) {
	// 				console.log('用户点击确定'),
	// 				that.deletegoods()
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
	// 	})
  // },


  
 


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
   * 页面相关事件处理函数
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
// components/testconp/testconp1.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
   styleIsolation:"apply-shared"
  },

  properties: {
    max:{
      type:Number,
      value:1
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addcount(){
      if(this.data.count>=this.properties.max) return
      this.setData({
        count:this.data.count+1,
        max:this.properties.max-1
       
      })
      this._showcount()
    },
    _showcount(){
      wx.showToast({
        title: 'count的值为：'+this.data.count,
        icon:"/image/dianhua-a.png"
      })
      
    },
    showinfo(){
      console.log(this.data),
      console.log(this.properties)
      console.log(this.data===this.properties)
    }

  }
})

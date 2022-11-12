// components/test3/test3.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    fullColor:'0,0,0',
    rgb:{r:0,g:0,b:0}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addR(){
      this.setData({
        'rgb.r': this.data.rgb.r+20>255?255:this.data.rgb.r+20
      })
    },
    addG(){
      this.setData({
        'rgb.g': this.data.rgb.g+20>255?255:this.data.rgb.g+20
      })
    },
    addB(){
      this.setData({
        'rgb.b': this.data.rgb.b+20>255?255:this.data.rgb.b+20
      })
    },
    randomcolor(){
     this.setData({
       rgb:{
         r:Math.floor(Math.random()*256),
         g:Math.floor(Math.random()*256),
         b:Math.floor(Math.random()*256)
       }
     })
    }

  },
  observers:{
    'rgb.**':function(obj){
      this.setData({
        fullColor:`${obj.r},${obj.g},${obj.b}`
      })
    }
  },
  pageLifetimes:{
    show(){
      console.log('show'),
      this.randomcolor()
    },
    hide(){
      console.log('hide')
    }
  }

   
  
})

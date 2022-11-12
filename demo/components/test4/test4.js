// components/test4/test4.js
const mybehavior=require("../../behaviors/behavior")
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[mybehavior],
  options:{
    multipleSlots:true
  },
  properties: {
    count:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
   

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addcount(){
      this.setData({
        count:this.data.count+1
      })
      this.triggerEvent('add',{value:this.data.count})
    }

    
  }
})

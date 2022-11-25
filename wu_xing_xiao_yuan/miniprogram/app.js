//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-9gaunl0x483e6245',
        traceUser: true,
      })
    }

    this.globalData = {//存储全局变量
      goodsId:{}//商品id，点击某个商品的时候用来存储全局变量
    }
    // // // 数据库
    // const db = wx.cloud.database({
    //   env: "cloud1-9gaunl0x483e6245"
    // });
  }
})
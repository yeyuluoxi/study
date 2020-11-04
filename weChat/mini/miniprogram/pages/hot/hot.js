Page({
    data: {
        products:"",
        first:""
    },
    onLoad: function (options) {
        this.getproducts();
    },
    detail(e){
        wx.navigateTo({
          url: '/pages/detail/detail?pid='+e.currentTarget.dataset.pid,
        })
    },
    getproducts(){
        wx.cloud.callFunction({
            name:"hotsales",
            data:{}
        }).then(res=>{
            this.setData({
                first:res.result.first,
                products:res.result.products
            })
        })
    }
})
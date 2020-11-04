Page({
    data: {
        result:[],
        message:""
    },
    onLoad: function (options) {
        this.search(options);
    },
    search(obj){
        let {cid,title}=obj;
        cid=cid-0;
        wx.cloud.callFunction({
            name:"search",
            data:{cid,title}
        }).then(res=>{
            this.setData({
                result:res.result
            })
        })
    },
    todetail(e){
        wx.navigateTo({
            url: '/pages/detail/detail?pid='+e.currentTarget.dataset.pid
        })
    },
    update(e){
        this.setData({
            message:e.detail.value
        })
    },
    tosearch(){
        let message=this.data.message;
        if(message){
            this.search({title:message});
            this.setData({message:""})
        }
    }
})
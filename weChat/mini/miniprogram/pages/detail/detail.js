Page({
    data: {
        details:"",
        banners:"",
        data:"",
        actvie:1,
        he:750,
        buy:1,
        uname:wx.getStorageSync('uname')||""
    },
    onLoad: function (options) {
        let pid=options.pid;
        this.detail(pid);
    },
    detail(pid){
        let db=wx.cloud.database();
        let _=db.command
        db.collection("product").field({
            _id:false,
            pid:true,
            img:true,
            title:true,
            imgs:true,
            details:true,
            price:true,
            stock:true
        }).where({
            pid:_.eq(pid-0)
        }).get().then(res=>{
            let data=res.data[0];
            let details=data.details.split("|");
            let banners=data.imgs.split("|");
            banners.unshift(data.img);
            this.setData({
                details,
                banners,
                data
            })
        })
    },
    wd(e){
        this.setData({
            active:e.detail.current+1
        })
    },
    we(e){
        let width=e.detail.width,height=e.detail.height;
        height=750*height/width;
        this.setData({
            he:height
        })
    },
    addcart(){
        let uname=this.data.uname;
        if(uname){
            let pid=this.data.data.pid,buy=this.data.buy;
            wx.cloud.callFunction({
                name:"carupdate",
                data:{uname,buy,pid}
            }).then(res=>{
                if(res.result.code==201){
                    wx.showToast({
                        title: '添加成功',
                    })
                }
            })
        }else{
            wx.showToast({
              title: '请先登录',
              icon:'none'
            })
        }
    },
    add(){
        let buy=this.data.buy,stock=this.data.data.stock;
        buy++;
        if(buy<=stock){
            this.setData({buy})
        }
    },
    minus(){
        let buy=this.data.buy;
        buy--;
        if(buy>=1){
            this.setData({buy})
        }
    }
})
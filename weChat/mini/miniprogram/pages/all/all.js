Page({
    data: {
        group:[],
        classify:[],
        active:0,
        top:[],
        movei:0
    },
    onLoad: function (options) {
        wx.cloud.callFunction({
            name:"classify",
            data:{}
        }).then(res=>{
            this.setData({
                classify:res.result.classify,
                group:res.result.group
            })
        })
    },
    gettop(){
        let query = wx.createSelectorQuery()
        query.selectAll('.items').boundingClientRect()
        let top=[];
        query.exec(res=>{
            res[0].forEach(elem=>{
                top.push(elem.top);
            })
            this.setData({
                top
            });
        });

    },
    tops(){
        if(!this.data.top.length){
            this.gettop();
        }
    },
    moveto(e){
        this.tops();
        let id=e.target.dataset.gid;
        this.setData({
            active:id,
            movei:id
        });
    },
    move(e){
        this.tops();
        let top=e.detail.scrollTop;
        this.data.top.forEach((elem,i,arr)=>{
            if(top>=elem&&(i==arr.length-1||top<arr[i+1])){
                this.setData({
                    active:i
                })
            }
        })
    },
    tosearch(e){
        wx.navigateTo({
          url:'/pages/search/search?cid='+e.currentTarget.dataset.cid
        })
    }
})

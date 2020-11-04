Page({
    data: {
        car:[],
        todo:false,
        select:false,
        checkboxs:[],
        total:0,
        buy:[],
        uname:wx.getStorageSync('uname')||""
    },
    onShow:function(){
        this.getcar();

    },
    checktodo(){//判断是否有选择
        let checkboxs=this.data.checkboxs,todo=this.data.todo;
        let bool=checkboxs.some(elem=>elem);
        if(bool!=todo){
            this.setData({
                todo:bool
            })
        }
    },
    checkselect(){//判断是否全选
        this.data.select=this.data.checkboxs.every(elem=>elem);
    },
    getcar(){//获取初始数据
        this.setData({//初始化页面数据
            select:false,
            checkboxs:[],
            todo:false
        });
        wx.cloud.callFunction({
            name:"shopcar",
            data:{
                uname:this.data.uname
            }
        }).then(res=>{
            let car=res.result.list;
            let checkboxs=car.map(()=>false);
            let buy=car.map(elem=>elem.buy);
            this.setData({
                car,checkboxs,buy
            })
        })
    },
    toselect(e){//点击选择
        let index=e.currentTarget.dataset.index;
        let checkboxs=this.data.checkboxs;
        checkboxs[index]=!checkboxs[index];
        this.checkselect();
        this.checktodo();
        this.total(checkboxs);
        this.setData({
            checkboxs,
            select:this.data.select
        })
    },
    total(checkboxs){
        let car=this.data.car,buy=this.data.buy;
        let total=checkboxs.reduce((prev,elem,i)=>{
            if(elem){
                prev+=buy[i]*car[i].price;
            }
            return prev;
        },0);
        this.setData({
            total
        });
    },
    selectall(){
        let all=this.data.select,checkboxs=this.data.checkboxs;
        checkboxs=checkboxs.map(()=>!all);
        this.total(checkboxs);
        this.setData({
            checkboxs,
            select:!all,
            todo:!all
        })
    },
    updatecar(pid,buy){
        wx.cloud.callFunction({
            name:"carupdate",
            data:{
                uname:this.data.uname,pid,buy
            }
        }).then(res=>{
            let car=this.data.car;
            switch(res.result.code){
                case 200:
                    car=car.filter(elem=>!(pid.indexOf(elem.pid)+1))
                    let checkboxs=car.map(()=>false);
                    this.setData({car,checkboxs});
                    this.total(checkboxs);
                    break;
                case 202:
                    let buyarr=this.data.buy;
                    car=car.map((elem,i)=>{
                        if(elem.pid==pid){
                            elem.buy=buy;
                            buyarr[i]=buy;
                        }
                        return elem;
                    });
                    this.setData({car,buy:buyarr});
                    
                    this.total(this.data.checkboxs);
                    break;
            }
        })
    },
    del(){
        if(this.data.todo){
            wx.showModal({
              title: '提示',
              content:"确认执行此操作?",
              success:res=>{
                let delpid=this.data.checkboxs.map((elem,i)=>{
                    if(elem){
                        return this.data.car[i].pid
                    }else{
                        return 0;
                    }
                });
                  this.updatecar(delpid);
              }
            })
        }
    },
    toadd(e){
        let index=e.currentTarget.dataset.index,car=this.data.car;
        let value=this.data.buy[index];
        value++;
        if(car[index].stock>=value){
            this.updatecar(car[index].pid,value);
        }
    },
    tominus(e){
        let index=e.currentTarget.dataset.index,car=this.data.car;
        let value=this.data.buy[index];
        value--;
        if(value>=1){
            this.updatecar(car[index].pid,value);
        }
    },
    tochange(e){
        let value=e.detail.value-0,index=e.currentTarget.dataset.index;
        let buy=this.data.buy[index],stock=this.data.car[index].stock;
        if(value>0&&value<=stock&&value!=buy){
            this.updatecar(this.data.car[index].pid,value);
        }else{
            this.setData({
                buy:this.data.buy
            })
        }
    },
    todetail(e){
        wx.navigateTo({
          url: '/pages/detail/detail?pid='+e.currentTarget.dataset.pid
        })
    }
})
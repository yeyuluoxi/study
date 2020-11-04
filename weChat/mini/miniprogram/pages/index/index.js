const app = getApp()

Page({
  data: {
    banners:[
      "https://img.yzcdn.cn/upload_files/2020/08/24/Fm4Pi5pcHcmfw-x-m9tFJI8GB5Th.jpg!large.webp",
      "https://img.yzcdn.cn/upload_files/2020/08/24/FiGgMxgELvAR3Nwzb-I-htXEfHNx.jpg!large.webp",
      "https://img.yzcdn.cn/upload_files/2020/08/24/FtyiNOEogYbfQ_ALq8QaKeqwPwSI.jpg!large.webp",
      "https://img.yzcdn.cn/upload_files/2020/08/18/FjYEruT2WRdmF2NHlUyF9dKqIFek.jpg!large.webp",
      "https://img.yzcdn.cn/upload_files/2020/08/24/FuKTshIHrx9xgop3Ps73FCLy_Iil.jpg!large.webp"
    ],
    wd:"",//轮播图高度
    titles:["国馆首页","周末专场","积分商城","会员特权","掌柜福利","众筹好物","国潮大赏"],//标题
    productlist:[],
    group:[],
    classname:[],
    title:""
  },
  onLoad: function() {
    const db=wx.cloud.database();
    const _=db.command;
    wx.cloud.callFunction({
      name:"classify",
      data:{}
    }).then(res=>{
      let group=res.result.group,classify=res.result.classify;

      let classname=classify.map(elem=>{
        if(elem){
          return elem.reduce((prev,ele)=>{
            prev.push(ele.classify);
            return prev;
          },["新品"])
        }
      })
      let classifyid=classify.reduce((prev,elem,i)=>{
        if(elem){
          prev[i]=elem.map(elem=>{
            return elem.cid
          });
        }
        return prev;
      },[]);
      let list=[],end=0;
      group.forEach((elem)=>{
        let order=elem.gid;
        db.collection("product").field({
          _id:false,
          pid:true,
          img:true,
          price:true,
          title:true
        }).where({
          cid:_.in(classifyid[order])
        }).limit(6).get().then(res=>{
          list[order-1]=res.data;
          end++;
          if(end==group.length){
            this.setData({
              productlist:list,
              classname,
              group
            })
          }
        })
      });
    })
  },
  detail(e){
    wx.navigateTo({
      url: '/pages/detail/detail?pid='+e.currentTarget.dataset.pid
    })
  },
  tosearch(){
    let title=this.data.title;
    if(title){
      wx.navigateTo({
        url: '/pages/search/search?title='+title
      })
    }
  },
  update(e){
    this.setData({
      title:e.detail.value
    })
  },
  wh(e){
    let wd=wx.getSystemInfoSync().windowWidth;
    let iwd=e.detail.width,ihe=e.detail.height;
    let k=wd/iwd;
    this.setData({
      wd:ihe*k+'px'
    })
  },
  select(e){
    this.setData({
      active:e.target.dataset.order
    })
  }
})

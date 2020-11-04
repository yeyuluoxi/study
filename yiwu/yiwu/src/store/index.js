import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path:"http://127.0.0.1:6060",//服务端接口
    isOnline:localStorage.getItem("isOnline")||false,//是否在线
    shade:false,//遮罩层
    sign:false,//登录界面显示
    carleng:0,//购物车数量
    confirm:false,//确认框是否显示
    fun:"",//确认框函数
    tipstart:false,//提示框是否显示
    tiptype:true,//提示框类型
    tipmessage:"",//提示框信息
    collection:JSON.parse(sessionStorage.getItem("collection"))||[],//收藏列表
    uname:localStorage.getItem("uname")||"",//用户名
    upwd:localStorage.getItem("upwd")||"",//用户密码 备用
    params:JSON.parse(sessionStorage.getItem("params"))||{
      gid:"",
      yid:"",
      title:"",
      page:1,
      orderby:"",
      order:'asc',
      either:""
    }//搜索参数
  },
  mutations: {
    upcollect(state,obj){
      let {bool,pro}=obj;
      if(bool){
        state.collection.push(pro);
      }else{
        state.collection.forEach((elem,i,arr)=>{
          if(elem.pid==pro.pid){
            arr.splice(i,1);
          }
        })
      }
      sessionStorage.setItem("collection",JSON.stringify(state.collection));
    },//收藏信息
    car(state,value){
      state.carleng=value;
    },
    tap(state){
      state.confirm=false;
      state.shade=false;
    },
    mconfirm(state,obj){
      let {fun,message}=obj;
      state.fun=fun;
      state.tipmessage=message;
      state.confirm=true;
      state.shade=true;
    },
    tip(state,obj){
      let {type,message}=obj;
      state.tiptype=type;
      state.tipmessage=message;
      state.tipstart=true;
    },//显示提示信息
    toshade(state,bool){
      state.shade=bool;
    },//遮罩层
    tosign(state,bool){
      state.sign=bool;
    },//登录界面/显示
    tipend(state){state.tipstart=false;},//显示提示信息
    in(state,obj){//登录
      state.isOnline=true;
      state.uname=obj.uname;
      state.upwd=obj.upwd;
    },
    out(state){//退出登录
      state.isOnline=false;
      localStorage.clear();
      state.uname="",
      state.upwd=""
    },
    search(state,obj){//修改查询参数
      let {key,value,either}=obj;
      let arr=["yid","gid","title"],brr=["page","orderby","order"];
      if(key!==undefined){
        arr.forEach(e=>{state.params[e]=""});
        state.params.either= either===undefined?"":either;
      }
      if(key){state.params[key]=value[0];};
      brr.forEach((elem,i)=>state.params[elem]= value[i+1]||"");
      sessionStorage.setItem("params",JSON.stringify(state.params));
    }
  },
  actions: {
    getlength(conText){
      axios.get("http://127.0.0.1:6060/product/count",{params:{
        uname:conText.state.uname
      }}).then(res=>{
        conText.commit("car",res.data.count);
      })
    }
  },
  modules: {
  }
})

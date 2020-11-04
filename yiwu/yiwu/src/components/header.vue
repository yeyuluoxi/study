<template>
    <div ref="header">
      <div class="header clear bg_red flex">
        <div class="left"><img src="../assets/logo.png" alt=""></div>
        <div class="search"><input type="text" v-model="title" placeholder="其实搜索很简单^_^ !" :style="{'width':width+'px'}"><img src="../assets/search.png" @click="tosearch(0)"></div>
        <div><button class="right bg_red" @click="showli"><img src="../assets/list.png" alt=""></button></div>
        
      </div>
      <div class="list" :style="{'height':height+'px'}">
        <ul ref="list">
          <li v-if="!isOnline" class="sign" @click="$router.push('/sign')">登录</li>
          <li v-if="!isOnline" class="sign" @click="$router.push('/reg')">注册</li>
          <li :class="{index}" @click="toindex">首页</li>
          <li @click="tosearch(1)">全部商品</li>
          <li @click="tosearch(2)">五金工具</li>
          <li v-for="(k,i) of list" :key="i">{{k}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
  name:"mHeader",
  props:["index"],
  data(){
    return {
      wd:"",
      width:0,
      list:["如何发货","仓库实景","联系我们","我的足迹","我的订单"],
      height:0,
      title:""
    }
  },
  methods:{
    ...mapMutations(["search"]),
    showli(){
        this.height= this.height?0:this.$refs.list.offsetHeight;
    },
    toindex(){
      if(!this.index){
        this.$router.push("/index");
      }
    },
    tosearch(i){
      if(i==0&&this.title){
        this.search({key:"title",value:[this.title,1]});
      }else if(i==1){
        this.search({key:"",value:['',1,"pid","asc"]});
      }else if(i==2){
        this.search({key:"gid",value:[5,1]});
      }else{
        return ;
      }
      let url=window.location.href;
      if(url.indexOf("search")+1){
          this.height=0;
          this.$parent.select=0;
          this.$emit("update",true);
        }else{
          this.$router.push("/search");
      }
    }
  },
  mounted(){
    this.wd=this.$refs.header.offsetWidth;
    this.width=this.wd-160;
  },
  computed:{
    ...mapState(["params","isOnline"])
  }
}
</script>
<style scoped>
.header{
  height:2.75rem;
  justify-content: space-between;
}

.header .left{
  line-height:30px;
  max-width:6.25rem;
  max-height: 2.75rem;
  padding:5px;
}
.header .left img{
  margin-top:6px;
  max-height:100%;
  max-width:100%;
}
.header button.right{
  margin:0.5rem 0.25rem 0 0;
  border:1px solid #fff;
  border-radius: 5px;
  outline:0;
}
.header .search{
  position:relative;
  flex:1;
  top:0.5rem;
}
.header .search input{
  position:absolute;
  right:1rem;
  height:28px;
  border-radius:5px;
  outline:0;
  border:0;
  padding:5px;
  font-size:12px;
}
.header .search img{
  position:absolute;
  right:1rem;
  top:3px;
}
.list{
  height:0;
  overflow: hidden;
  transition:all 0.3s linear;
}
.list>ul{
  padding:10px;
  background-color:#f5f5f5;
  border-bottom: 2px solid #d2354c;
}
.list>ul>li{
  line-height:1.6;
  text-align:left;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  vertical-align: middle;
  padding:5px 0;
  border-bottom: 1px solid #e8e8e8;
}
.list>ul>li.index{
  color:#d2354c;
}
.list>ul>li.sign:first-child{
  margin:5px 0;
  text-align:center;
  font-size:12px;
  color: #d13b49;
  background-color: #ffcbd0;
  border:1px solid #ffb5bc
}
.list>ul>li.sign:nth-child(2){
  margin:0 0 5px;
  text-align:center;
  color: #5eb95e;
  background-color: #E4F3E4;
  border:1px solid #d2e8d2;
}
.list>ul>li:last-child{
  border:0;
}
</style>
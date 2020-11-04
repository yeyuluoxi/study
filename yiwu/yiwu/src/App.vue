<template>
  <div id="app">
    <div class="alltop">本站所有商品支持混批，600元发货，全面支持微信支付宝付款！</div>
    <router-view/>
    <m-footer></m-footer>
    <m-footest></m-footest>
    <m-serve></m-serve>
    <div :class="{shade}"></div>
    <div v-if="sign" class="bottomsign">
      <div class="title">登录<span @click="cancel">x</span></div>
      <sign-in></sign-in>
      <div class="bottom">站长统计</div>
    </div>
    <m-tip :type="tiptype" :message="tipmessage"></m-tip>
    <m-confirm v-if="confirm"></m-confirm>
  </div>
</template>
<script>
import mServe from "./components/serves.vue"
import mFootest from "./components/footest.vue"
import mFooter from "./components/footer.vue"
import mTip from "./components/tip.vue"
import signIn from "./components/signin.vue"
import mConfirm from "./components/confirm.vue"
import {mapState,mapMutations} from "vuex"
export default {
  components:{mServe,mFootest,mFooter,mTip,signIn,mConfirm},
  computed:{
    ...mapState(["tiptype","tipmessage","sign","shade","confirm"])
  },
  watch:{
    shade(){
      if(this.shade){
        document.body.style.overflow="hidden";
      }else{
        document.body.style.overflow="";
      }
    }
  },
  methods:{
    ...mapMutations(["tosign","toshade"]),
    cancel(){
      this.toshade(false);
      this.tosign(false);
    },
  }
}
</script>
<style>
.bottomsign{
  background-color:#fff;
  position:fixed;
  bottom:0;
  z-index:15;
  width:100%;
  height:400px;
}
.bottomsign .sign{
  background-color:#fff;
}
.bottomsign .bottom{
  text-align:left;
  font-size:12px;
  margin-top:-20px;
}
.bottomsign .main{
  padding:10px;
  margin:0;
  background-color:#fff;
}
.bottomsign .main>div{
  padding:0;
}
.bottomsign .title{
    font-size: 18px;
    font-weight: bold;
    line-height: 43px;
    padding: 0 30px;
    text-align:center;
    border-bottom: 1px solid #dedede
}
.bottomsign .title span{
    float:right;
    color: #999;
    font-size: 20px;
    line-height: 43px;
    opacity: .2;
    margin-right:-10px;
}
.shade{
  position:fixed;
  top:0;
  width:100%;
  height:100vh;
  background-color:rgba(72,72,72,0.5);
  z-index:12;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.alltop{
  font-size:12px;
  background-color: #fff7f1;
  border-color: #fff0e4;
  color: #f37b1d;
  padding:0.625rem;
  text-align: left;
}
body,div,p,a,input,h1,h3,ul,li,img,button,table,thead,th,tr,td,tbody{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
ul{
  list-style:none;
}
a{
  text-decoration: none;
}
.clear::after{
  content:"";
  display:block;
  clear:both;
}
.flex{
  display:flex;
}
.bg_red{
  background-color:#d2354c;
}
.color_red{
  color:#d2354c;
}
button,input{
  outline:0;
}
</style>
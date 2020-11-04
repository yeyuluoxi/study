<template>
    <div>
        <div class="center">
            <m-top v-if="start"></m-top>
            <m-order></m-order>
            <m-list :title="'交易提醒'" :img="require('../assets/center/allorder.png')" :sub1="'查看全部订单'" :sub2="'交易提醒可帮助您了解订单状态和物流情况'"></m-list>
            <div class="shopcar" v-if="shopcar.length">
                <div class="title"><div><div></div><span @click="$router.push('/shopcar')">更多》</span>购物车</div></div>
                <div class="list" v-for="(k,i) of shopcar" :key="i">
                    <img :src="path+k.pic" @click="$router.push('/details/'+k.pid)">
                    <div>
                        <div @click="$router.push('/details/'+k.pid)">{{k.title}}</div>
                        <p><span>¥{{k.price.toFixed(2)}}</span><span>x{{k.buy}}</span></p>
                    </div>
                </div>
            </div>
            <m-list :title="'购物车'" :img="require('../assets/center/carnone.png')" :sub1="'您的购物车还是空的'" :sub2="'将想买的商品放进购物车，一起结算更轻松'" v-else></m-list>
            <div class="collection" v-if="collection.length">
                <div class="title"><div><div></div>商品收藏</div></div>
                <div class="flex">
                    <div class="list" v-for="(k,i) of collection" :key="i" @click="$router.push('/details/'+k.pid)">
                        <div>
                        <img :src="path+k.pic">
                        <span>¥{{k.price}}</span>
                        <p>{{k.title}}</p>

                        </div>
                    </div>
                </div>
            </div>
            <m-list :title="'商品收藏'" :img="require('../assets/center/collection.png')" :sub1="'您还没有收藏商品'" :sub2="'收藏的商品将显示最新的促销活动和降价情况'" v-else></m-list>
            <m-list :title="'我的足迹'" :img="require('../assets/center/step.png')" :sub1="'您的商品浏览记录为空'" :sub2="'赶紧去商城看看促销活动吧'"></m-list>
            <div class="out" @click="logout">
                <img src="../assets/out.png" alt="">
            </div>
        </div>
        <m-bottom :start="'center'"></m-bottom>
    </div>
</template>
<script>
import mBottom from "../components/bottom"
import mTop from "../components/center/top"
import mOrder from "../components/center/order"
import mList from "../components/center/list"
import {mapMutations,mapState} from "vuex"
export default {
    components:{mBottom,mTop,mOrder,mList},
    data(){
        return {
            start:false,
            shopcar:[]
        }
    },
    methods:{
        ...mapMutations(["out","mconfirm"]),
        signout(){
            this.out();
            this.$router.push("/index");
        },
        logout(){
            this.mconfirm({message:"确认退出?",fun:[this.signout]});
        }
    },
    mounted(){
        this.start=true;
        this.axios.get("/product/center",{params:{
            username:this.uname
        }}).then(res=>{
            this.shopcar.push(...res.data);
        })
    },
    computed:{
        ...mapState(["uname","path","collection"])
    }
}
</script>
<style scoped>
.center .out{
    display:inline-block;
    position:fixed;
    right:10px;
    padding:10px;
    border-radius: 50%;
    background-color: #eee;
    bottom: 70px;
    right: 10px;
    z-index:9;
}
.title{
    color:#444;
    font-size:0.75rem;
    padding:0.5rem;
    text-align:left;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
}
.title div>div{
    display:inline-block;
    height:0.75rem;
    border-left: 3px solid #ed636d;
    margin:0 5px;
}
.title span{
    color:#666;
    float:right;
    padding-right:0.25rem;
}
.shopcar .list{
    font-size:0.75rem;
    text-align:left;
    padding:0.5rem;
}
.shopcar .list>div{
    display:inline-block;
    vertical-align: top;
    padding:0 0.5rem;
    color:#333;
}
.shopcar .list p{
    padding-top:0.5rem;
}
.shopcar .list p span{
    color:#777;
}
.shopcar .list p span:first-child{
    color: #d2364c;
    font-weight: 700;
    margin-right:1rem;
}
.shopcar .list img{
    width:60px;
    height:60px;
    padding: 2px;
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid #ddd;
}
.shopcar .list+.list{
    border-top:1px solid #f5f5f5;
}
.collection .flex{
    flex-wrap: wrap;
}
.collection .list{
    width:50%;
    position:relative;
    padding:0.25rem;
    background-color:#fff;
}
.collection .list img{
    max-width: 100%;
}
.collection img{
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid #ddd;
}
.collection span{
    position:absolute;
    top:0;
    right:0;
    background-color: #d2364c;
    color: #fff;
    padding: 0 0.25rem;
    font-size:0.75rem;
}
.collection p{
    position:absolute;
    bottom:0;
    font-size: 0.8rem;
    color: #FFF;
    padding:0.5rem 0.25rem;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.collection .list>div{
    max-width: 100%;
    position:relative;
}
</style>
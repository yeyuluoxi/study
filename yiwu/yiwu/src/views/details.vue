<template>
    <div>
        <div>
            <m-banner :imgs="pictures" v-if="start"></m-banner>
        </div>
        <div class="details">
            <div class="title">{{product.title}}</div>
            <div class="price" :style="{'background-image':'url('+path+'/img/products/bg.png)'}">
            销售价<span class="price">¥<h1>{{product.price}}</h1></span><span class="dark">(起批量{{product.lowest}})</span>
            </div>
            <div class="count"><p>累计销量<span>{{product.sales}}</span></p><p>浏览次数<span>{{product.readtimes}}</span></p><p>累计评论<span>0</span></p></div>
            <div class="select" @click="tocar">可选规格<span>></span></div>
            <div class="commont">
                <ul class="flex">
                    <li :class="{'active':active==0}" @click="active=0">详情</li>
                    <li :class="{'active':active==1}" @click="active=1">评论(0)</li>
                    <li :class="{'active':active==2}" @click="active=2">猜你喜欢</li>
                </ul>
            </div>
            <div class="intr">
                <img :src="path+product.intr" alt="">
                <img v-for="(k,i) of pictures" :key="i" :src="path+k" alt="">
            </div>

        </div>
        <read-me></read-me>
        <div class="bottom">
            <router-link to="/"><img src="../assets/detailhome.png" alt=""> 首页</router-link>
            <button class="save" :class="{'tosave':save}" @click="tosave">
                <img src="../assets/save.png" alt="" v-if="save">
                <img src="../assets/unsave.png" alt="" v-else>
                {{save?"已收藏":"收藏"}}
            </button>
            <button @click="tocar">立即购买</button>
            <button class="shopcar" @click="tocar">加入购物车</button>
        </div>
        <div class="car" v-if="buy">
            <div class="buy">
                <div class="mes">
                    <div class="img"><img :src="path+pictures[0]" alt=""></div>
                    <span class="buyprice">¥{{product.price.toFixed(2)}}</span><span @click="cancel"><img src="../assets/cancel.png" alt=""></span>
                </div>
                <p>数量</p>
                <div class="numbers"><button @click="minus">-</button><input @blur="val" type="number" v-model="lowest"><button @click="add">+</button><span>库存{{product.stock}}件</span></div>
                <button class="confirm" @click="buytocar">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
import mBanner from "../components/index/banner"
import readMe from '../components/details/readme'
import {mapState,mapMutations,mapActions} from "vuex"
export default {
    name:"detail",
    components:{readMe,mBanner},
    data(){
        return {
            product:{},
            pictures:[],
            start:false,
            active:0,
            save:false,
            pid:"",
            buy:false,
            lowest:""
        }
    },
    mounted(){
        this.pid=this.$route.params.pid;
        this.axios.get('/product/details',{
            params:{pid:this.pid}
        }).then(res=>{
            let product=res.data;
            this.pictures.push(product.pic);
            this.pictures.push(...product.pics.split('|'));
            this.product=product;
            this.lowest=product.lowest;
            this.start=true;
        });
        this.save=this.collection.some(elem=>elem.pid==this.pid);
    },
    computed:{
        ...mapState(["path","uname","carleng","isOnline","collection"])
    },
    methods:{
        ...mapMutations(["tip","tosign","toshade","upcollect"]),
        ...mapActions(["getlength"]),
        tosave(){
            this.save=!this.save;
            let pro=this.product;
            this.upcollect({bool:this.save,pro});
            this.tip({type:true,message:this.save?"收藏成功":"取消收藏"})
            
        },
        tocar(){
            if(this.isOnline){
                window.scroll(0,0);
                document.body.style.overflow="hidden";
                this.buy=true;
            }else{
                this.toshade(true);
                this.tosign(true);
            }
        },
        cancel(){
            this.buy=false;
            document.body.style.overflow='';
        },
        val(){
            let regexp=new RegExp("^\\d+$");
            regexp.test(this.lowest)?"":this.lowest=0;
            this.lowest=Math.max(this.lowest,this.product.lowest);
            this.lowest=Math.min(this.lowest,this.product.stock);
        },
        minus(){
            if(this.lowest>this.product.lowest){
                this.lowest--;
            }else{
                this.tip({type:false,message:`最低起订量${this.lowest}件`});
            }
        },
        add(){
            if(this.lowest<this.product.stock){
                this.lowest++;
            }else{
                this.tip({type:false,message:`库存数量${this.product.stock}件`})
            }
        },
        buytocar(){
            //加入购物车
            this.axios.get("/product/addcar",{params:{
                prid:this.pid,
                username:this.uname,
                buy:this.lowest
            }}).then(res=>{
                this.tip({type:true,message:"加入成功"});
                this.cancel();
                this.getlength();
            })
        }
    }
}
</script>
<style scoped>
.details{
    font-size:12px;
    color:#666;
    text-align:left;
}
.title{
    font-size:14px;
    color:#333;
    padding:5px;
    font-weight:600;
}
.price{
    background-size: cover;
    background-repeat: no-repeat;
    height: auto;
    padding: 25px 5px 15px;
}
span.price>h1{
    display:inline-block;
    padding:0 15px 0 5px;
}
span.price{
    padding-left:10px;
    color:#d2364c;
}
span.dark{
    color:#333;
}
.count{
    display:flex;
    justify-content: space-between;
}
.count span{
    color:#d2364c;
}
.select,.count{
    padding:10px 5px;
    border-bottom: 1px solid #F5F5F5;
}
.select span{
    float:right;
}
.commont{
    margin-top: 10px;
    background-color:#F5F5F5;
}
.commont ul{
    justify-content: space-between;
    text-align:center;
    font-size:14px;
}
.commont ul>li{
    flex:1 1 33.33%;
    height: 36px;
    line-height: 36px;
    padding:4px 0;
}
.commont ul>li.active{
    color:#d2364c;
    border-bottom: 2px solid #d2364c;
}
.intr>img{
    width:100%;
}
.bottom{
    display:flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 7;
    width: 100%;
    background: #fff;
}
.bottom a,.bottom .save{
    flex:1;
    font-size:12px;
    height: 35px;
    line-height: 35px;
    color:#555;
    outline:0;
    background-color:#fff;
    border-top: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
}
.bottom .save.tosave{
    color:#cf2915 ;
}
.bottom button{
    outline:0;
    flex:1.5;
    font-size:14px;
    border:0;
    height: 35px;
    line-height: 35px;
    background-color: #FFEDED;
    color: #d2364c
}
.bottom .shopcar{
    color:#fff;
    background-color: #d2364c;
}
.car{
    text-align:left;
    overflow: hidden;
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:100vh;
    background-color:rgba(51,51,51,0.5);
}
.car .buy{
    position:fixed;
    bottom:0;
    width:100%;
    background-color:#fff;
}
.car .buy .mes img{
    max-width: 100%;
}
.car .buy .mes .img{
    display:inline-block;
    border-radius: 5px;
    width:80px;
    height:80px;
    background-color:#fff;
    position:relative;
    left:20px;
    top:-20px;
    padding:5px;
}
.mes span:last-child{
    margin:12px;
    padding:5px;
    float:right;
}
.mes span.buyprice{
    position:absolute;
    left:110px;
    top:10px;
    color:#C40000;
}
.car p{
    font-weight:600;
}
.car .numbers{
    margin:10px 0;
}
.car .numbers button{
    width: 35px;
    height: 25px;
    outline: none;
    line-height: 23px;
    color: #555555;
    text-align: center;
    background-color: #eeeeee;
    border: 1px solid #ccc;
    border-radius: 0;
}
.car .numbers input{
    width: 60px;
    height: 25px;
    text-align: center;
    font-size: 12px;
    border:1px solid #ccc;
    border-left:0;
    border-right:0;
    outline:0;
}
.car .numbers span{
    font-size:12px;
    color:#333;
}
.car .confirm{
    width:100%;
    border:0;
    color:#fff;
    outline:0;
    background-color: #d2364c;
    border-color: #d2364c;
    font-size: 16px;
    padding: 5px;
}
</style>
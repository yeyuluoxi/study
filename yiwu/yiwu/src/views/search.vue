<template>
<div>
    <m-header @update="up"></m-header>
    <div class="search">
        <p class="count">筛选出<span>{{count}}</span>条数据</p>
        <div class="top">
            <ul class="flex">
                <li><span>品牌</span></li>
                <li><span>分类</span></li>
                <li><span>价格</span></li>
            </ul>
        </div>
        <div class="order">
            <ul class="flex">
                <li :class="{'selected':select==0}" @click="order(0)">综合</li>
                <li :class="{'selected':select=='sales'}" @click="order('sales')">销量<img v-if="select!='sales'" src="../assets/less.png"><img v-else-if="!lg.sales&&select=='sales'" src="../assets/lessactive.png"><img v-else-if="lg.sales&&select=='sales'" src="../assets/larger.png"></li>
                <li :class="{'selected':select=='price'}" @click="order('price')">价格<img v-if="select!='price'" src="../assets/less.png"><img v-else-if="!lg.price&&select=='price'" src="../assets/lessactive.png"><img v-else-if="lg.price&&select=='price'" src="../assets/larger.png"></li>
            </ul>
        </div>
        <div class="products flex" v-if="count">
            <div v-for="(k,i) of products" :key="i" @click="$router.push(`/details/${k.pid}`)">
                <div class="product">
                    <img :src="path+k.pic" alt="">
                    <p>{{k.title}}</p>
                    <div class="price">¥{{k.price.toFixed(2)}}</div>
                    <button class="shopcar" @click="tocar(k.pid,$event)">加入购物车</button>
                </div>
            </div>
            <p class="none" v-if="end"><button>没有更多了</button></p>
            <p class="more" @click="more" v-else><button>加载更多>></button></p>
        </div>
        <div class="zero" v-else>
            <img src="../assets/zero.png" alt=""> 没有相关数据
        </div>
    </div>
    <m-search :pid="pid" v-if="shop" @close="close"></m-search>
    <m-bottom :start="''"></m-bottom>
</div>
</template>
<script>
import mHeader from "../components/header.vue"
import mBottom from "../components/bottom.vue"
import mSearch from "../components/search/searchcar.vue"
import {mapState,mapMutations,mapActions} from "vuex"
export default {
    components:{mHeader,mBottom,mSearch},
    data(){
        return {
            start:"",
            products:[],
            count:0,
            select:"",
            pages:"",
            end:false,
            lg:{"sales":false,"price":false},
            message:"",
            pid:"",
            shop:false
        }
    },
    mounted(){
        this.getpros();
    },
    methods:{
        ...mapMutations(["search","tosign","toshade"]),
        ...mapActions(["getlength"]),
        close(bool){
            this.shop=bool;
            this.toshade(false);
        },
        getpros(){
            this.axios.get("/product/search",{params:this.params}).then(res=>{
                this.count=res.data.count;
                this.pages=Math.ceil(this.count/6);
                if(this.params.page==this.pages){
                    this.end=true;
                }else{
                    this.end=false;
                };
                if(this.params.page==1){
                    this.products=[];
                }
                this.message=false;
                this.products.push(...res.data.result);
            })
        },
        tocar(pid,e){
            e.stopPropagation();
            if(this.isOnline){
                this.pid=pid;
                this.toshade(true);
                this.shop=true;
            }else{
                this.tosign(true);
                this.toshade(true);
            }
        },
        order(way){
            if(this.select==way){
                this.lg[way]=!this.lg[way];
            }else{
                this.select=way;
                this.lg={"sales":false,"price":false};
            }
            if(way){
                let order=this.lg[way]?"asc":"desc";
                this.search({
                    value:["",1,way,order]
                });
            }else{
                this.search({value:["",1]});
            }
            this.getpros();

        },
        more(){
            let page=this.params.page;
            page++;
            this.search({value:["",page]});
            this.getpros();
        },
        up(value){
            this.message=value;
        }
    },
    computed:{
        ...mapState(["path","params","isOnline"])
    },
    watch:{
        message(){
            if(this.message){
                this.getpros();
            }
        }
    }
}
</script>
<style scoped>
.search{
    font-size:12px;
    color:#333;
    text-align:left;
}
.search .count{
    padding:10px;
    color:#888;
}
.search .count span{
    font-weight: 500;
    color: #fe90a0;
}
.search .top{
    margin:10px 0;
}
.search .top li{
    flex:1;
    text-align:center;
}
.search .top li span{
    display:inline-block;
    background-color: #999999;
    color: #ffffff;
    font-weight: 600;
    width: 80%;
    height: 24px;
    line-height: 24px;
    border-radius: 100px;
}
.search .order ul{
    height:30px;
    line-height:30px;
}
.search .order li{
    flex:1;
    text-align:center;
    border-bottom: 1px solid #eee;
}
.search .order li.selected{
    color:#d2364c;
}
.search .products{
    flex-wrap: wrap;
}
.search .products>div{
    flex:0 0 50%;
    padding:5px;
}
.search .products img{
    max-width: 100%;
}
.search .product{
    border:1px solid #e8e8e8;
    overflow: hidden;
    position:relative;
}
.search .product p{
    line-height: 18px;
    height: 35px;
}
.search .product .price{
    padding:5px 0;
    font-size: 18px;
    line-height: 30px;
    color: #D2364C;
}
.search .shopcar{
    position:absolute;
    bottom:10px;
    right:20px;
    outline:0;
    background-color: #fff;
    border-radius: 3px;
    line-height: 24px;
    color: #0080FC;
    border: 1px solid #0080FC;
    display: inline-block;
    padding:0 12px;
}
.search .more,.search .none{
    width:100%;
    padding:0 10px;
}
.search .more button,.search .none button{
    padding:5px 0;
    width:100%;
    color: #666;
    font-size:12px;
    background-color: #e6e6e6;
    border:1px solid #d5d5d5;
}
.search .none button{
    color:#d1d1d1;
    background-color:#f4f4f4;
}
.search .zero{
    text-align:center;
    padding: 30px 0;
    background: #FFF;
    color: #888;
}
</style>
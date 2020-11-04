<template>
    <div class="car">
        <div class="top">
            <span @click="cancel">x</span>
        </div>
        <div class="center">
            <div class="flex">
                <div class="img">
                    <img :src="path+product.pic" alt="">
                </div>
                <div class="title">{{product.title}}</div>
            </div>
            <div class="price">
                <div>价格: <span> ¥{{price.toFixed(2)}}</span></div>
                <div>起批量: <span> {{low}}</span></div>
            </div>
            <div class="count">数量: <button @click="minus">-</button><input type="number" v-model="buy" @blur="num"><button @click="add">+</button></div>
        </div>
        <button @click="tocar">确定添加</button>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from "vuex"
export default {
    props:["pid"],
    data(){
        return {
            product:"",
            low:"",
            buy:"",
            stock:"",
            price:0
        }
    },
    mounted(){
        this.axios.get(`/product/details?pid=${this.pid}`).then(res=>{
            let data= {price:this.price,lowest:this.low,stock:this.stock}=this.product=res.data;
            this.buy=this.low;
        })
    },
    methods:{
        ...mapMutations(["tip","toshade"]),
        ...mapActions(["getlength"]),
        cancel(){
            this.$emit("close",false);
        },
        minus(){
            if(this.buy>this.low){
                this.buy--;
            }else{
                this.tip({type:false,message:`最低起购数量${this.low}件`})
            }
        },
        add(){
            if(this.buy<this.stock){
                this.buy++;
            }else{
                this.tip({type:false,message:`库存数量${this.stock}件`})
            }
        },
        num(){
            this.buy=Math.max(this.buy,this.low);
            this.buy=Math.min(this.buy,this.stock);
        },
        tocar(){
            this.axios.get("/product/addcar",{params:{
                prid:this.pid,
                username:this.uname,
                buy:this.buy
            }}).then(res=>{
                if(res.data.code==200){
                    this.tip({type:true,message:"添加成功"})
                    this.getlength();
                    this.cancel();
                }
            })
        }
    },
    computed:{
        ...mapState(["path","uname"])
    }
}
</script>
<style scoped>
.car{
    z-index:15;
    position:fixed;
    bottom:0;
    width:100%;
    color:#333;
    font-size:14px;
    text-align:left;
    background-color:#fff;
}
.car .top{
    height:40px;
    font-size:20px;
    color:#999;
    border-bottom: 1px solid #dedede;
}
.car .top>span{
    float:right;
    line-height:40px;
    padding:0 15px;
}
.center{
    padding:10px;
}
.center img{
    width:80px;
    height:80px;
}
.img{
    border-radius: 10px;
    padding:10px;
    border:1px solid #f5f5f5;
}
.title{
    overflow: hidden;
    padding:20px 10px 0;
}
.price{
    padding:20px 0 30px;
}
.count button,.count input{
    background-color: #eee;
    border: 1px solid #ccc;
    width:1.5rem;
    text-align:center;
    height:1.5rem;
}
.count input{
    background-color:#fff;
    width:15%;
}
.car>button{
    background-color: #d2364c;
    border:0;
    color: #fff;
    border-radius: 3px;
    margin:15px 0 15px 15px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    width: 90%;
}
</style>
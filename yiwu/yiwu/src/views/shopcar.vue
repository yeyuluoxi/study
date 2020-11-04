<template>
    <div>
        <m-header></m-header>
        <div class="shopcar">
            <div class="cars" v-if="leng">
                <div class="top">
                    <div class="left">商品信息</div><div class="center">数量</div><div class="delete">操作</div>
                </div>
                <div class="shop">
                    <div v-for="(k,i) of shoppings" :key="i">
                        <div class="left">
                            <div class="flex">
                                <input type="checkbox" v-model="checked[i]" >
                                <img :src="path+k.pic">
                                <div class="title">{{k.title}}</div>
                            </div>
                            <div class="buy"><span class="price">¥{{k.price}}</span><span>x{{k.buy}}</span></div>
                        </div>
                        <div class="center">
                            <div class="flex"><button @click="minus(i)">-</button><input :value="val[i]" type="number" @blur="update(i,$event)"><button @click="add(i)">+</button></div>
                        </div>
                        <div class="delete" @click="del(k.sid)">删除</div>
                    </div>
                </div>
                <div class="buy flex">
                    <div class="select">
                        <input type="checkbox" v-model="select" id="all">
                        <label for="all">{{select?"反选":"全选"}}</label>
                        <span @click="delall(0)">删除</span>
                    </div>
                    <div class="compute">
                        <span>合计:</span>
                        <span class="total">¥{{total.toFixed(2)}}</span>
                        <button @click="delall(1)">结算</button>
                    </div>
                </div>
            </div>
            <div class="blank" v-else>
                <div class="center">
                    <div>
                        <img src="../assets/blank.png" alt="">
                    </div>
                    <div>
                        <p class="to">您的购物车还是空的，您可以</p>
                        <p>看看<router-link to="/center">我的收藏夹</router-link></p>
                        <p>看看<router-link to="/center">我的订单</router-link></p>
                    </div>
                </div>
            </div>
        </div>
        <m-bottom :start="'shopcar'"></m-bottom>
    </div>

</template>
<script>
import mBottom from "../components/bottom"
import mHeader from "../components/header"
import {mapState,mapMutations,mapActions} from "vuex"
export default {
    components:{mBottom,mHeader},
    data(){
        return {
            shoppings:[],
            select:false,
            checked:new Array(this.leng),
            val:[]
        }
    },
    mounted(){
        this.getlist();
        this.getlength();
    },
    methods:{
        ...mapMutations(["tip","mconfirm"]),
        ...mapActions(["getlength"]),
        getlist(){
            this.axios.get("/product/shopcar",{params:{
                uname:this.uname
            }}).then(res=>{
                this.shoppings.push(...res.data);
            })
        },
        turn(arr,bool){
            for(let i=0;i<arr.length;i++){
                arr[i]=bool;
            }
        },
        //删除
        delete(sid){
            this.axios.get("/product/del",{params:{
                sid
            }}).then(res=>{
                if(res.data.code==200){
                    let index=this.shoppings.reduce((prev,elem,i)=>{
                        if(elem.sid==sid){
                            prev=i;
                        }
                        return prev;
                    },-1);
                    this.checked.splice(index,1);
                    this.shoppings.splice(index,1);
                    this.getlength();
                }
            })
        },
        //删除单个
        del(sid){
            this.mconfirm({
                fun:[this.delete,sid],
                message:"删除后不可恢复、确认操作吗？"
            });
        },
        //删除多个
        deleteall(){
            this.checked.reduce((prev,elem,i)=>{
                if(elem){
                    prev.push(this.shoppings[i].sid);
                };
                return prev;
            },[]).forEach(elem=>{
                this.delete(elem);
            });
        },
        delall(bool){
            let leng=this.checked.filter(elem=>elem).length;
            if(leng){
                let message="删除后不可恢复、确认操作吗？"
                if(bool){
                    message=`支付${this.total.toFixed(2)}元`
                }
                this.mconfirm({
                    fun:[this.deleteall],
                    message
                });
            }else{
                this.tip({type:false,message:"请选择商品"});
            }
        },
        //更新购物车
        upda(sid,buy,i){
            this.axios.get("/product/updatecar",{params:{
                sid,buy
            }}).then(res=>{
                if(res.data.code==200){
                    this.shoppings[i].buy=buy;
                }
            })
        },
        minus(i){
            let {lowest,buy,sid}=this.shoppings[i];
            if(buy>lowest){
                this.upda(sid,--buy,i);
            }else{
                this.tip({type:false,message:"不能低于商品起购数量"});
            }
        },
        add(i){
            let {stock,buy,sid}=this.shoppings[i];
            if(buy<stock){
                this.upda(sid,++buy,i);
            }else{
                this.tip({type:false,message:"不能高于商品库存数量"});
            }
        },
        update(i,e){
            let value=e.target.value;
            let {lowest,stock,buy,sid}=this.shoppings[i];
            if((value.indexOf("e")+1)||value<lowest){//含有e或小于起订量
                if(buy==lowest){//含有e,原数量为最低起订量
                    e.target.value=buy;
                }else{
                    this.upda(sid,lowest,i);
                }
                this.tip({type:false,message:"不能低于商品起购数量"});
            }else if(value>stock){//高于库存量
                if(buy==stock){//原数量为库存量
                    e.target.value=buy;
                }else{
                    this.upda(sid,stock,i);
                }
                this.tip({type:false,message:"不能高于商品库存数量"});
            }else{
                this.upda(sid,value,i);
            }
        }
        
    },
    computed:{
        ...mapState(["uname","path"]),
        leng(){
            this.val=[];
            this.shoppings.map(elem=>{
                this.val.push(elem.buy);
            });
            return this.shoppings.length;
        },
        total(){
            return this.checked.reduce((prev,elem,i)=>{
                if(elem){
                    prev+=this.shoppings[i].price*this.shoppings[i].buy;
                }
                return prev;
            },0)
        }
    },
    watch:{
        select(){
            this.checked=new Array(this.leng);
            if(this.select){
                this.turn(this.checked,true);
            }else{
                this.turn(this.checked,false)
            }
        }
    }
}
</script>
<style scoped>
.blank .center{
    margin:40px 0 80px;
    text-align:left;
}
.blank .center{
    display:flex;
    justify-content: center;
}
.blank .center>div:first-child{
    margin-right:10px;
}
.blank p{
    font-size:12px;
    color:#333;
    margin-bottom:5px;
}
.blank p.to{
    font-size:14px;
    margin-bottom:10px;
}
.blank p a{
    color:#d13b49;
    margin-left:5px;
}
.cars{
    text-align:left;
    font-size:12px;
    color:#333;
}
.cars .left{
    width:60%;
}
.cars .center{
    width:25%;
}
.cars .delete{
    width:15%;
}
.cars .top{
    font-weight: 600;
}
.cars .top>div,.cars .shop>div>div{
    display:inline-block;
    padding:7px;
    vertical-align: top;
}
.cars .shop>div{
    border-top:1px solid #f5f5f5;
}
.cars .shop .center>div{
    width:100%;
}
.cars .shop .center button{
    line-height: 23px;
    height: 25px;
    outline:0;
    padding:0 7px;
    background-color: #eeeeee;
    border: 1px solid #ccc;
    flex:0;
}
.cars .shop .center input{
    border: 1px solid #ccc;
    text-align:center;
    outline:0;
    width:50%;
    flex:1;
}
.cars img{
    width:40px;
    height:40px;
    margin:0 5px;
}
.cars .shop .title{
    overflow: hidden;
    height:40px;
}
.cars .shop .buy{
    padding-top:6px;
}
.cars .shop .price{
    display:inline-block;
    text-align:right;
    width:58px;
    margin-right:5px;
    color:#d2364c;
    font-weight: 500;
}
.cars>.buy{
    margin:20px 0;
    height:50px;
    line-height:50px;
    background-color:#eee;
    padding-left:10px;
}
.cars .buy .total{
    color:#d2364c;
    font-size:16px;
    font-weight: 700;
    margin-left:10px;
}
.cars .select{
    flex:3;
}
.cars .compute{
    flex:8;
}
.cars .select span{
    margin:0 10px;
}
.cars .select label{
    padding-left:5px;
}
.cars .compute button{
    float:right;
    border:1px solid #ffb5bc;
    outline:0;
    height:50px;
    padding:10px 20px;
    color: #d13b49;
    background-color: #ffcbd0;
    font-size:20px;
    font-weight: 500;
}
</style>
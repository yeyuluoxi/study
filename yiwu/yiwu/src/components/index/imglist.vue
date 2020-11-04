<template>
    <div class="list">
        <div v-for="(k,i) of list" :key="i" @click="link(i)">
            <div class="img" :style="{'background-color':k.color}">
                <img :src="k.img" alt="">
            </div>
            <p>{{k.title}}</p>
        </div>
    </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
    name:"imgList",
    data(){
        return {
            list:[
                {
                    'img':require("../../assets/products.png"),
                    'title':'商品汇总',
                    'color':"#FB6E52"
                },
                {
                    'img':require("../../assets/two.png"),
                    'title':'二元商品',
                    'color':"#699"
                },
                {
                    'img':require("../../assets/send.png"),
                    'title':'常见问题',
                    'color':"#96c"
                },
                {
                    'img':require("../../assets/about.png"),
                    'title':'关于我们',
                    'color':"#48CFAE"
                },
                {
                    'img':require("../../assets/about.png"),
                    'title':'行业新闻',
                    'color':"#699"
                },
                {
                    'img':require("../../assets/two.png"),
                    'title':'我的足迹',
                    'color':"#49acfa"
                },
                {
                    'img':require("../../assets/send.png"),
                    'title':'如何发货',
                    'color':"#FF0066"
                },
                {
                    'img':require("../../assets/car.png"),
                    'title':'仓库一角',
                    'color':"#996"
                }
            ]
        }
    },
    methods:{
        ...mapMutations(["search"]),
        link(i){
            if(i==0){
                this.search({key:"",value:["",1]});
                this.$router.push("/search");
            }else if(i==1){
                this.search({key:"",value:["",1],either:0});
                this.$router.push("/search");
            }else{
                return ;
            }
        }
    }
}
</script>
<style scoped>
.list{
    display:flex;
    flex-wrap: wrap;
}
.list>div{
    flex:25%;
    text-align:center;
    margin:10px 0;
    font-size:12px;
    color:#333;
}
.list>div>div.img{
    width:50px;
    height:50px;
    border-radius:50%;
    margin:0 auto;
}
.list img{
    width:26px;
    height:26px;
    position:relative;
    top:12px;
}
</style>
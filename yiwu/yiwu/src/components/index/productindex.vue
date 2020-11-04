<template>
    <div class="product">
        <div class="title">
            <p>{{title.gname}}</p>
        </div>
        <div class="img" :style="{'background-color':title.color}" @click="tosearch(title.gid)">
            <p>所有{{title.gname}}</p>
            <img :src="path+title.img" alt="">
        </div>
        <div class="products">
            <div v-for="(k,i) of products" :key="i" @click="details(k.pid)">
                <div>
                    <img :src="path+k.pic" alt="">
                </div>
                <p class="proname">{{k.title}}</p>
                <p class="price">¥{{k.price.toFixed(2)}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    name:"productIndex",
    props:["title","products"],
    computed:{
        ...mapState(["path","params"])
    },
    methods:{
        ...mapMutations(["search"]),
        details(pid){
            this.$router.push(`/details/${pid}`);
        },
        tosearch(gid){
            this.search({key:"gid",value:[gid,1]});
            this.$router.push("/search");
        }
    }
}
</script>
<style scoped>
.title{
    padding:0 10%;
    background-color:#eee;
    height:40px;
}
.title>p{
    font-size: 14px;
    margin: 20px 0px;
    line-height: 1px;
    border-left: 60px solid #d2364c;
    border-right: 60px solid #d2364c;
    text-align: center;
    float: none;
    position:relative;
    top:20px;
}
.img>p{
    font-size:12px;
    color:#fff;
    padding:30px 0 10px;
}
.products{
    display:flex;
    flex-wrap: wrap;
    text-align: left;
    font-size:12px;
}
.products>div{
    flex:0 0 50%;
    padding:10px;
    border-bottom:1px solid #eee;
    border-right:1px solid #eee;
}
.products>div>div{
    padding:10px;
}
.products img{
    max-width: 100%;
}
p.price{
    color:#c00;
    padding:5px 0;
    font-weight: bold;
}
</style>
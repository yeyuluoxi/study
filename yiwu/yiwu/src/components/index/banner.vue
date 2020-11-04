<template>
    <div class="banner">
        <div :style="{'left':'-'+left+'px'}" :class="{duration}">
            <div v-for="(k,i) of imgs" :key="i">
                <img :src="path+k" alt="">
            </div>
            <div>
                <img :src="path+imgs[0]" alt="">
            </div>
        </div>
        <ul><li v-for="(k,i) of imgs" :key="i" @click="moveto(i)" :class="{'active':active==i}"></li></ul>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"mBanner",
    props:["imgs"],
    data(){
        return {
            width:"",//屏幕宽度
            left:0,//轮播div位置
            leng:"",//轮播图片数量
            duration:true,//轮播效果
            active:0,//激活按钮位置
            banner:"",//保存循环执行
            once:"",//图片立即更换
            timebetween:5000//轮播时间间隔
        }
    },
    mounted(){
        this.leng=this.imgs.length;
        this.widthupdate();
        this.banner=setInterval(()=>{
            this.swiper();
        },this.timebetween)
    },
    methods:{
        swiper(){
            this.widthupdate();
            this.duration=true;
            this.active++;
            this.left=this.active*this.width;
            this.active=this.active%this.leng;
            if(this.left==this.leng*this.width){
                this.once=setTimeout(()=>{
                    this.duration=false;
                    this.left=0;
                },600);
            }
        },
        widthupdate(){
            this.width=document.body.offsetWidth;
        },
        moveto(i){
            this.widthupdate();
            this.duration=true;
            this.left=i*this.width;
            this.active=i;
            clearTimeout(this.once);
            clearInterval(this.banner);
            this.banner=setInterval(()=>{
                this.swiper();
            },this.timebetween)
        }
    },
    computed:{
        ...mapState(["path"]),
    }
}
</script>
<style scoped>
.banner{
    width:100%;
    position:relative;
    overflow: hidden;
}
.banner>div{
    position:relative;
    display:flex;
}
div.duration{
    transition:all 0.6s linear;
}
div.banner>div>div{
    width:100%;
    flex-grow: 0;
    flex-shrink: 0;
}
div img{
    width:100%;
}
ul{
    position:absolute;
    bottom:5px;
    width:100%;
}
ul>li{
    display:inline-block;
    border-radius: 50%;
    width:10px;
    height:10px;
    background-color:rgba(0, 0, 0, 0.25);
    margin:0 6px;
}
ul>li.active{
    background-color:#d3374b;
}
</style>
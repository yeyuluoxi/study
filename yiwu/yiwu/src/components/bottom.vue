<template>
        <mt-tabbar v-model="selectedTab" class="bottom" fixed>
            <mt-tab-item v-for="(k,i) of list" :key="i" :id="k.type" class="rel">
                <span v-if="k.type=='shopcar'&&isOnline&&carleng" class="count">{{carleng}}</span>
                <div v-if="selectedTab == k.type" class="active">
                    <img :src="k.img" slot="icon">
                    <p>{{k.title}}</p>
                </div>
                <div v-else>
                    <img :src="k.imgn" slot="icon">
                    <p>{{k.title}}</p>
                </div>
            </mt-tab-item>
        </mt-tabbar>
</template>
<script>
import {mapState,mapMutations,mapActions} from "vuex"
export default {
    name:"mBottom",
    props:["start"],
    data(){
        return {
            selectedTab:this.start,
            url:"",
            list:[
                {
                    'title':"首页",
                    'type':'index',
                    'img':require('../assets/home.png'),
                    'imgn':require('../assets/homeno.png')
                },
                {
                    'title':"分类",
                    'type':'class',
                    'img':require('../assets/type.png'),
                    'imgn':require('../assets/typeno.png')
                },
                {
                    'title':"购物车",
                    'type':'shopcar',
                    'img':require('../assets/shopcar.png'),
                    'imgn':require('../assets/shopcarno.png')
                },
                {
                    'title':"我的",
                    'type':'center',
                    'img':require('../assets/myself.png'),
                    'imgn':require('../assets/myselfno.png')
                }
            ]
        }
    },
    watch:{
        selectedTab(){
            let arr=['index','class','shopcar','center'];
            let i=arr.indexOf(this.selectedTab);
            let j=arr.indexOf(this.url);
            if(this.isOnline){
                this.$router.push("/"+this.selectedTab);
            }else if(i<=1&&j>1){
                this.url=this.selectedTab;
            }else if(i>1){
                this.toshade(true);
                this.tosign(true);
                let a=this.url;
                this.url=this.selectedTab;
                this.selectedTab=a;
            }else{
                this.$router.push("/"+this.selectedTab);
            }
        }
    },
    computed:{
        ...mapState(["isOnline","uname","carleng"])
    },
    methods:{
        ...mapMutations(["toshade","tosign"]),
        ...mapActions(["getlength"])
    },
    mounted(){
        this.url=this.start;
        if(this.isOnline){
            this.getlength();
        }

    }
}
</script>
<style scoped>
.bottom{
    border-top: 1px solid #f5f5f5;
    background-color:#fff;
}
.bottom div{
    background-color:#fff;
}
.bottom a{
    padding:0;
    background-color:#fff !important;
}
.bottom img{
    width:24px;
}
.active p{
    color:#d2364c;
}
.bottom .rel{
    position:relative;
}
.bottom .count{
    position:absolute;
    border-radius: 20px;
    background-color:#dd514c;
    color:#fff;
    border:1px solid #fff;
    padding: 0.1rem 0.25rem;
}
</style>
<template>
    <div>
        <m-header></m-header>
        <div class="type">
            <ul class="left">
                <li :class="{'active':active==-1}" @click="active=-1">爆款推荐</li>
                <li v-for="(k,i) of list" :key="i" :class="{'active':active==i}" @click="active=i">{{k}}</li>
            </ul>
            <div class="group">
                <ul>
                    <li v-for="(k,i) of all" :key="i" @click="tosearch(i)">{{k}}</li>
                </ul>
            </div>
        </div>
        <m-bottom :start="'class'"></m-bottom>
    </div>
</template>
<script>
import mBottom from '../components/bottom'
import mHeader from '../components/header'
import {mapState, mapMutations} from "vuex"
export default {
    name:"classify",
    components:{mBottom,mHeader},
    data(){
        return {
            list:[],
            lin:[],
            yid:[],
            active:-1,
            all:['爆款推荐']
        }
    },
    mounted(){
        this.axios.get('/product/type').then(res=>{
            // console.log(res.data)
            res.data.forEach(elem=>{
                let id=elem.groupid-1;
                if(this.list.indexOf(elem.gname)+1){
                    this.lin[id].push(elem.yname);
                    this.yid[id].push(elem.yid)
                }else{
                    this.list.splice(id,1,elem.gname);
                    this.lin[id]=new Array(elem.yname)
                    this.yid[id]=[elem.yid]
                }
            });
        })
    },
    methods:{
        ...mapMutations(["search"]),
        tosearch(i){
            this.search({key:"yid",value:[(this.active+1||"")&&this.yid[this.active][i],1]});
            this.$router.push({path:"/search",params:this.params})
        }
    },
    computed:{
        ...mapState(["params"])
    },
    watch:{
        active(){
            if(this.active+1){
                this.all=this.lin[this.active];
            }else{
                this.all=['爆款推荐'];
            }
        }
    }
}
</script>
<style scoped>
.type{
    display:flex;
    background-color:#fff;
    position:relative;
    color:#888;
}
.left{
    /* position:absolute; */
    background-color:#f5f5f5;
    /* flex:0 0 20%; */
    font-weight: 500;
    font-size:14px;
    padding-bottom:60px;
}
ul.left>li{
    border-top: 1px solid #e9e9e9;
    padding:0 1rem;
    height: 45px;
    line-height: 45px;
    border-left: 3px solid transparent;
}
ul.left>li.active{
    background: #fff;
    color: #d2364c;
    border-left: 3px solid #d2364c;
}
.group{
    padding:10px;
    flex:1 1 50%;
    font-size:12px;
}
.group>ul>li{
    border: 1px solid #eee;
    padding: 1rem;
    margin:0 10px 15px 0;
    text-align:left;
}
</style>
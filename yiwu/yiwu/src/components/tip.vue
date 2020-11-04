<template>
    <div :class="{type,start}" class="tip" ref="wd" v-show="tipstart" :style="{top}">
        <div>{{message}}</div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    props:["message","type"],
    data(){
        return {
            top:'30%',
            start:false
        }
    },
    methods:{
        ...mapMutations(["tipend"])
    },
    computed:{
        ...mapState(["tipstart"])
    },
    watch:{
        tipstart(){
            if(this.tipstart){
                this.start=true;
                setTimeout(()=>{this.top=(this.$refs.wd.offsetTop+20)+"px"},0);
                setTimeout(()=>{
                    this.start=false;
                    this.top="30%";
                    this.tipend();
                },1000)
            }
        }
    }
}
</script>
<style scoped>
.tip{
    z-index:16;
    text-align:center;
    position:fixed;
    width: 100%;
}
.tip div{
    color: #f77076;
    background-color: #ffe2e5;
    border-color: #facbd0;
    padding:10px;
    font-size:12px;
    border-radius:5px;
    min-width: 100px;
    margin:0 auto;
    display: inline-block;
    text-align:left;
}
.type div{
    border-color:#f2faee;
    background-color:#f2faee;
    color:#5eb95e;
}
.start{
    transition: all 1s linear;
}
</style>
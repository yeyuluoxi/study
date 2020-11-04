<template>
    <div class="img">
      <div v-for="(k,i) of imgs" :key="i" @click="tosear(link[i])">
        <img :src="k" alt="">
      </div>
    </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
    name:"imgS",
    data(){
        return {
            imgs:[require('../../assets/play.jpg'),require('../../assets/change.jpg'),require('../../assets/multi.jpg'),require('../../assets/kitchen.jpg'),],
            link:[1,4,2,7]
        }
    },
    methods:{
        ...mapMutations(["search"]),
        tosear(i){
            this.search({key:"gid",value:[i,1],either:1});
            this.$router.push("/search");
        }
    }
}
</script>
<style scoped>
.img{
    width:100vw;
    display:flex;
    flex-wrap: wrap;
    padding:5px;
}
.img>div{
    flex:0 0 50%;
    padding:5px;
}
.img img{
    max-width:100%;
}
</style>
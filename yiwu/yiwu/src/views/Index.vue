<template>
  <div class="home" ref="home">
    <m-header :index="true"></m-header>
    <m-banner :imgs="pictures" v-if="start"></m-banner>
    <img-list></img-list>
    <img-s></img-s>
    <div v-if="prod">
      <product-index v-for="(k,i) of title" :key="i" :title=k :products="products[i]"></product-index>
    </div>
    <m-bottom :start="'index'"></m-bottom>
  </div>
</template>

<script>
import mBanner from "../components/index/banner"
import mHeader from "../components/header.vue"
import mBottom from "../components/bottom.vue"
import imgList from "../components/index/imglist.vue"
import productIndex from "../components/index/productindex.vue"
import imgS from "../components/index/imgs.vue"

export default {
  components:{mBanner,mHeader,mBottom,imgList,productIndex,imgS},
  data(){
    return {
      test:"test",
      pictures:[],
      start:false,
      title:[
        {
          gname:"爆款推荐",
          color:'#f69',
          img:'/img/classify/fire.png'
        }
      ],
      products:new Array(9),
      prod:false
    }
  },
  methods:{
    loaded(){
      let a=this.products.reduce((prev,elem)=>{
        elem&&prev++;
        return prev;
      },0);
      if(a==9){
        this.prod=true;
        // console.log(this.products);
      }
    },
    
  },
  mounted(){
    this.axios.get("/product/banner").then(res=>{
      this.pictures=res.data.reduce((prev,elem)=>{
        prev.push(elem.img);
        return prev;
      },[])
      this.start=true;
    });
    //热销
    this.axios.get("/product/hotsales").then(res=>{
      this.products.splice(0,1,res.data);
      this.loaded()
    });
    //其余
    this.axios.get('/product/group').then(res=>{
      this.title.push(...res.data);
      res.data.forEach(elem=>{
        this.axios.get('/product/index',{params:{'gid':elem.gid}}).then(res=>{
          this.products.splice(elem.gid,1,res.data);
          this.loaded();
        })
      })
    })
  }
}
</script>

<template>
    <div class="top">
        <div class="tips"><img src="../../assets/center/message.png">消息</div>
        <div class="avatar"><img :src="img"></div>
        <div class="username">{{uname}}</div>
        <div class="edit">
            <ul class="flex">
                <li @click="avatar=true"><img src="../../assets/center/up.png">修改头像</li>
                <li><img src="../../assets/center/edit.png">修改资料</li>
                <li><img src="../../assets/center/addr.png">修改地址</li>
            </ul>
        </div>
        <div class="bottom">
            <ul class="flex">
                <li><p>0</p><p>订单总数</p></li>
                <li><p>{{collection.length}}</p><p>商品收藏</p></li>
                <li><p>0</p><p>我的足迹</p></li>
                <li><p>0</p><p>我的积分</p></li>
            </ul>
        </div>
        <m-avatar v-if="avatar"></m-avatar>
    </div>
</template>
<script>
import {mapState} from "vuex";
import mAvatar from "./avatar"

export default {
    components:{mAvatar},
    data(){
        return {
            avatar:false,
            img:require("../../assets/center/avatar.jpg")
        }
    },
    computed:{
        ...mapState(["uname","collection",'path'])
    },
    watch:{
        avatar(){
            document.body.style.overflow= this.avatar?'hidden':'';
        }
    },
    mounted(){
        this.axios.get('/user/avatar',{params:{uname:this.uname}}).then(res=>{
            if(res.data){
                this.img=this.path+res.data;
            }
        })
    }
}
</script>
<style scoped>
.top{
    position:relative;
    width:100%;
    color:#f8f8f8;
    font-size:0.75rem;
    height:210px;
    background-image:url(../../assets/center/centerbg.png);
    background-color: #ED5564;
    background-size: cover;
    position: relative;
    padding: 20px 0;
}
.tips{
    position:absolute;
    right:10px;
    top:10px;
}
.avatar img{
    border-radius: 100%;
    width:5rem;
    height:5rem;
    background-color:#000;
}
.username{
    padding:0.5rem;
}
.edit>ul{
    justify-content:center;
}
.edit>ul>li{
    margin-right:20px;
}
.bottom{
    position:absolute;
    bottom:0px;
    width:100%;
    padding:10px;
    background-color: rgba(0,0,0,0.1);
}
.bottom ul>li{
    width:25%;
}
</style>
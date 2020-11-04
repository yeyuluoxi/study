<template>
    <div class="avatar">
        <p>头像上传<span @click="$parent.avatar=false">x</span></p>
        <div class="flex">
            <div class="picture">
                <img :src="img">
            </div>
            <span>预览:</span>
            <div class="second">
                <img :src="img" alt="">
            </div>
        </div>
        <button class="select"><input @change='getavatar' type="file" accept="image/png,image/jpeg" ref="files">选择图片</button>
        <button @click="exavatar">确认</button>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    data(){
        return {
            img:this.$parent.img,
            image:""
        }
    },
    methods:{
        ...mapMutations(["tip"]),
        exavatar(){
            if(this.image){
                let params=new URLSearchParams();
                let iname=this.image.substr(this.image.lastIndexOf('\\')+1);
                params.append("image",this.image);
                params.append("iname",iname);
                params.append('uname',this.uname);
                this.axios.post('/user/avatar',params).then(res=>{
                    this.$parent.img=this.img;
                    this.$parent.avatar=false;
                    this.tip({type:true,message:"修改成功"});
                })
            }
        },
        getavatar(e){
            let file=e.target.files;
            if(file.length){
                let formData=new FormData();
                formData.append('image',file[0]);
                this.axios.post("/user/image",formData,{headers:{ 'Content-Type':'multipart/form-data' }}).then(res=>{
                    this.image=res.data;
                    this.img=this.path+this.image;
                })
            }
        }
    },
    computed:{
        ...mapState(["uname",'path'])
    }
}
</script>
<style scoped>
.avatar{
    width:100vw;
    height:100vmax;
    position:fixed;
    top:0;
    left:0;
    background-color:#fff;
    z-index:20;
    color:#000;
}
.avatar p{
    padding:0.5rem 1rem;
    font-size:1.25rem;
    text-align:center;
    border-bottom:1px solid #dedede;
}
p span{
    float:right;
    color:#999;
}
.flex>div{
    margin:0.5rem;
}
.picture{
    width:12.5rem;
    height:12.5rem;
    background-color:#000;
}
.second{
    width:7.5rem;
    height:7.5rem;
    border:1px solid #000;
    border-radius: 50%;
}
.second img{
    border-radius:50%;
}
.picture img,.second img{
    width:100%;
    height:100%;
}
button.select,.select input,.select+button{
    border-radius:0.25rem;
    border:1px solid #d5d5d5;
    outline:0;
    height:1.25rem;
    width:5rem;
}
button.select{
    position:relative;
}
input{
    opacity:0;
    position:absolute;
    top:-1px;
    left:-1px;
}
div>span{
    font-size:1.5rem;
    padding-top:1rem;
}
.select+button{
    margin-left:1rem;
}
</style>
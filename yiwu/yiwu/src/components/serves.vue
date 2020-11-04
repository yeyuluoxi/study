<template>
    <div class="serves">
        <div class="btn" @click="move" :class="{active}">
            <img src="../assets/online.png" alt="">
        </div>
        <div class="right" :class="{active}" :style="{'display':on}">
            <div>
                <h3>在线客服</h3>
                <p class="center">微信号：13396891168</p>
                <img src="../assets/code.jpg" alt="">
                <p class="center">客服QQ1：<img src="../assets/talk.jpg" alt=""></p>
                <p class="center">客服QQ2：<img src="../assets/talk.jpg" alt=""></p>
                <p class="center">电话：13396891168</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"mServe",
    data(){
        return {
            active:false,
            on:'none'
        }
    },
    methods:{
        move(){
            if(this.active){
                setTimeout(()=>{
                    this.on="none"
                },310);
            }else{
                this.on="block";
            }
            setTimeout(()=>{this.active=!this.active},0);
        }
    }
}
</script>
<style scoped>

.btn{
    width:35px;
    height:120px;
    padding:10px 5px;
    overflow: hidden;
}
.btn.active{
    right:270px;
}
.right{
    padding: 5px;
    width:0px;
    height:0px;
}
.right.active{
    height:435px;
    width:270px;
}
.btn,.right{
    background-color:#d2364c;
    position:fixed;
    top:30%;
    right:0;
    transition:all 0.3s linear;
}
.serves{
    display:flex;
    position:fixed;
    z-index:10;
}
.btn>img{
    height:90%;
}
.btn.active>img{
    position:relative;
    left:-25px;
}
.right>div{
    background-color:#F7F7F7;
}
p{
    color:#777;
    font-size:12px;
    border-bottom: solid 1px #E6E4E4;
    line-height: 38px;
    height: 38px;
}
p>img{
    margin-bottom:-10px;
}
.right img{
    max-width: 90%;
}
h3{
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 24px;
    padding: 5px;
}
</style>
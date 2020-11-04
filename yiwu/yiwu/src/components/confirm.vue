<template>
    <div class="confirm">
        <div class="message">
            <p>提示</p>
            <div class="title">
                {{tipmessage}}
            </div>
            <div class="button flex">
                <div class="cancel" @click="tap">取消</div>
                <div class="sure" @click="sure">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    computed:{
        ...mapState(["tipmessage","fun"])
    },
    methods:{
        ...mapMutations(["mconfirm","tap"]),
        sure(){
            this.fun[0](this.fun[1]);
            this.tap();
        }
    }
}
</script>
<style scoped>
.confirm{
    position:fixed;
    top:40%;
    text-align: center;
    width:100vw;
    z-index:15;
}
.confirm .message{
    border-radius:5px;
    width:60%;
    margin-left:20%;
    background-color:#fff;
}
.confirm p{
    font-size:20px;
    padding-top:10px;
}
.confirm .title{
    overflow-wrap: break-word;
    padding:15px;
    border-bottom:1px solid #dedede;
    font-size:12px;
}
.confirm .sure{
    border-left: 1px solid #dedede;
}
.confirm .button>div{
    width:50%;
    font-size:20px;
    color: #0e90d2;
    height:40px;
    line-height:40px;
}
</style>
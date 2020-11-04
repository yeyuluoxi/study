<template>
    <div class="sign">
        <div class="to">还没有账号?<a @click="toreg" class="reg">立即注册</a><router-link to="/" class="tour">游客</router-link></div>
        <div class="main">
            <div>
                <div class="input" :class="{nameok,'namef':!nameok&&namef}" >
                    <span>登录账号</span>
                    <input type="text" placeholder="用户名/手机/邮箱" v-model="uname" @blur="checkname">
                </div>
                <div class="input" :class="{pwdok,'pwdf':!pwdok&&pwdf}">
                    <span>登录密码</span>
                    <input type="password" placeholder="登录密码" v-model="upwd" @blur="checkpwd">
                </div>
                <div class="signin">
                    <button @click="login">登录</button><span>忘记密码?</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
    name:"singIn",
    data(){
        return {
            uname:"",
            upwd:"",
            nameok:false,
            pwdok:false,
            namef:false,
            pwdf:false
        }
    },
    methods:{
        ...mapMutations(["in","tip","tosign","toshade"]),
        login(){
            if(this.nameok&&this.pwdok){
                this.axios.post("/user/signin",`uname=${this.uname}&upwd=${this.upwd}`).then(res=>{
                    let code=res.data.code;
                    if(code==200){
                        localStorage.setItem("uname",this.uname);
                        localStorage.setItem("upwd",this.upwd);
                        localStorage.setItem("isOnline",true);
                        this.in({"uname":this.uname,"upwd":this.upwd});
                        this.tip({type:true,message:res.data.msg});
                        setTimeout(()=>{
                            this.cancel();
                            let url=window.location.href;
                            if(url.indexOf("search")==-1&&url.indexOf("detail")==-1&&url.indexOf("index")==-1){
                                this.$router.push("/index");
                            }
                        },1000)
                    }else{
                        this.tip({type:false,message:res.data.msg});
                    }
                })
            }
        },
        checkname(){
            this.uname=this.uname.trim();
            if(this.uname){
                this.nameok=true;
            }else{
                this.nameok=false;
            }
            this.namef=true;
        },
        checkpwd(){
            this.upwd=this.upwd.trim();
            let leng=this.upwd.length;
            if(leng>=6&&leng<=18){
                this.pwdok=true;
            }else{
                this.pwdok=false;
            }
            this.pwdf=true;
        },
        cancel(){
            this.toshade(false);
            this.tosign(false);
        },
        toreg(){
            this.cancel();
            this.$router.push("/reg");
        }
    }
}
</script>
<style scoped>
.sign{
    background-color:#fafafa;
    width:100%;
    padding:20px 0;
    font-size:12px;
    color:#333;
    text-align:left;
}
.to{
    padding-left:10px;
}
.main{
    margin:10px;
    padding:10px;
    background-color:rgba(0,0,0,0.15)
}
.main>div{
    background-color:#fff;
    padding:10px 10px 20px;
}
.signin>button,.to a{
    display:inline-block;
    border-radius: 2px;
    outline: none;
    padding: 0.5em 1em;
    border: 1px solid transparent;
    margin-left:5px;
}
.to .reg{
    color: #f77076;
    background-color: #ffe2e5;
    border-color: #facbd0
}
.to .tour{
    color: #F37B1D;
    background-color: #ffe5be;
    border-color: #f8d093;
}
.input{
    padding:5px 0;
    margin-bottom:15px;
}
.input>span{
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
}
.input>input{
    display: block;
    width: 100%;
    padding: 0.5em;
    line-height: 1.2;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline:0;
}
.input>input:focus{
    background-color: #fefffe;
    border:1px solid #3bb4f2;
}
.input.nameok>span,.input.pwdok>span{
    color:#5eb95e;
}
.input.nameok>input,.input.pwdok>input{
    border-color:#5eb95e;
}
.input.namef>span,.input.pwdf>span{
    color:#dd514c;
}
.input.namef>input,.input.pwdf>input{
    border-color:#dd514c;
}
.signin>button{
    font-size:12px;
    color: #d13b49;
    background-color: #ffcbd0;
    border-color: #ffb5bc;
}
.signin>span{
    float:right;
}
</style>